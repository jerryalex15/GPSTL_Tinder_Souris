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
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
     * Allows a student to apply to a job posting.
     *
     * @param applicationRequestDTO A map containing student_id and job_posting_id.
     * @return The created application.
     */
    @PostMapping("/apply")
    //@PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Application> applyToJob(@RequestBody ApplicationRequestDTO applicationRequestDTO) {
        Long studentId = applicationRequestDTO.getStudentId();
        Long jobPostingId = applicationRequestDTO.getJobPostingId();

        // Check if the application already exists
        boolean exists = applicationRepository.findByStudentId(studentId).stream()
                .anyMatch(app -> app.getJobPosting().getId().equals(jobPostingId));

        if (exists) {
            return ResponseEntity.badRequest().build();
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

    // TODO : Additional endpoints (update application status)
}
