package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Dto.ApplicationRequestDTO;
import com.gpstl.alternart.Dto.ApplicationRequestUpdateDTO;
import com.gpstl.alternart.Models.Application;
import com.gpstl.alternart.Models.JobPosting;
import com.gpstl.alternart.Models.Student;
import com.gpstl.alternart.Repositories.ApplicationRepository;
import com.gpstl.alternart.Repositories.JobPostingRepository;
import com.gpstl.alternart.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Get all applications.
     *
     * @return A list of all applications.
     */
    @GetMapping("/{id}")
    public ResponseEntity<List<Application>> applicationsToJob(@PathVariable Long id) {
        return ResponseEntity.ok(applicationRepository.findAll().stream().filter(app -> app.getJobPosting().getId().equals(id)).toList());
    }

    /**
     * Allows a student to apply to a job posting.
     *
     * @param applicationRequestDTO A map containing student_id and job_posting_id.
     * @return The created application.
     */
    @PostMapping("/apply")
    //@PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Application> applyToJob(@RequestBody ApplicationRequestDTO applicationRequestDTO) {
        Long userId = applicationRequestDTO.getStudentId();
        Long studentId = studentRepository.findByUserId(userId)
                .orElseThrow(
                        () -> new RuntimeException("Student not found with User ID: " + userId) ).getId();
        Long jobPostingId = applicationRequestDTO.getJobPostingId();

        // Check if the application already exists
        boolean exists = applicationRepository.findByStudentId(studentId).stream()
                .anyMatch(app -> app.getJobPosting().getId().equals(jobPostingId));

        if (exists) {
            Application app = applicationRepository.findByStudentId(studentId).stream()
                    .filter(a -> a.getJobPosting().getId().equals(jobPostingId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Application not found for student with ID: " + studentId + " and job posting ID: " + jobPostingId));

            return ResponseEntity.ok(app);
        }

        Application application = new Application();
        Student student = studentRepository.findById(studentId)
                .orElseThrow(
                        () -> new RuntimeException("Student not found with ID: " + studentId) );

        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(
                        () -> new RuntimeException("Job Posting not found with ID: " + jobPostingId) );

        application.setStudent(student);
        application.setJobPosting(jobPosting);
        application.setStatus("pending");
        application.setSuperLike(applicationRequestDTO.getSuperLike());

        Application savedApplication = applicationRepository.save(application);
        return ResponseEntity.ok(savedApplication);
    }

    /**
     * Allows a student to dismiss their application to a job posting.
     *
     * @param applicationRequestDTO A map containing student_id and job_posting_id.
     * @return A response entity indicating success or failure.
     */
    @DeleteMapping("/dismiss")
    //@PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> dismissApplication(@RequestBody ApplicationRequestDTO applicationRequestDTO) {
        Long studentId = applicationRequestDTO.getStudentId();
        Long jobPostingId = applicationRequestDTO.getJobPostingId();

        // Find the application based on student_id and job_posting_id
        Application application = applicationRepository.findByStudentId(studentId).stream()
                .filter(app -> app.getJobPosting().getId().equals(jobPostingId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Application not found for student with ID: " + studentId + " and job posting ID: " + jobPostingId));

        // Delete the application
        applicationRepository.delete(application);

        return ResponseEntity.ok("Application dismissed successfully");
    }

    /**
     * Allows companies to accept or deny by updating the status of an application.
     *
     * @param applicationRequestUpdateDTO A map containing student_id, job_posting_id and the new status.
     * @return The updated application.
     */
    @PutMapping("/update-status")
    public Map<String, Object> updateApplicationStatus(@RequestBody ApplicationRequestUpdateDTO applicationRequestUpdateDTO) {
        // Extract new status from the request body
        Long studentId = applicationRequestUpdateDTO.getStudentId();
        Long jobPostingId = applicationRequestUpdateDTO.getJobPostingId();
        String newStatus = applicationRequestUpdateDTO.getStatus(); // rejected or accepted

        // Find the application based on student_id and job_posting_id
        Application application = applicationRepository.findByStudentId(studentId).stream()
                .filter(app -> app.getJobPosting().getId().equals(jobPostingId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Application not found for student with ID: " + studentId + " and job posting ID: " + jobPostingId));

        // Update the application status
        application.setStatus(newStatus);

        Application updatedApplication = applicationRepository.save(application);

        // Créer une Map pour le retour
        Map<String, Object> responseMap = new HashMap<>();

        // Ajouter des propriétés à la Map
        responseMap.put("id_application", updatedApplication.getId());
        responseMap.put("jobPostingId", updatedApplication.getJobPosting().getId());
        responseMap.put("StudentId", updatedApplication.getStudent().getId());
        responseMap.put("status", updatedApplication.getStatus());
        return responseMap;
    }


    /**
     * Get all applications for a job posting.
     *
     * @param jobPostingId The ID of the job posting.
     * @return A list of applications.
     */
    @GetMapping("/job-posting/{jobPostingId}/applications/superliked")
    public List<Application> getSuperLikedApplicationsForJob(Long jobPostingId) {
        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with ID: " + jobPostingId));

        return new ArrayList<>(applicationRepository.findByJobPostingIdAndSuperLikeTrue(jobPosting.getId()));
    }


    /**
     * Get all regular applications for a job posting.
     *
     * @param jobPostingId The ID of the job posting.
     * @return A list of applications.
     */
    @GetMapping("/job-posting/{jobPostingId}/applications/regular")
    public List<Application> getRegularApplicationsForJob(Long jobPostingId) {
        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with ID: " + jobPostingId));

        return new ArrayList<>(applicationRepository.findByJobPostingIdAndSuperLikeFalse(jobPosting.getId()));
    }

    @GetMapping("/student/{studentId}")
    public List<Application> getApplicationsByStudentId(@PathVariable Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    @GetMapping("/job-posting/{jobPostingId}")
    public List<Application> getApplicationsByJobPostingId(@PathVariable Long jobPostingId) {
        return applicationRepository.findByJobPostingId(jobPostingId);
    }

    @GetMapping("/student/{studentId}/job-posting/{jobPostingId}")
    public List<Application> getApplicationsByStudentIdAndJobPostingId(@PathVariable Long studentId, @PathVariable Long jobPostingId) {
        return applicationRepository.findByStudentIdAndJobPostingId(studentId, jobPostingId);
    }


}
