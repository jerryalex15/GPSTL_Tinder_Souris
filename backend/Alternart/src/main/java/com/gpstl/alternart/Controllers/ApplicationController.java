package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Models.Application;
import com.gpstl.alternart.Models.JobPosting;
import com.gpstl.alternart.Models.Student;
import com.gpstl.alternart.Repositories.ApplicationRepository;
import com.gpstl.alternart.Repositories.JobPostingRepository;
import com.gpstl.alternart.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
     * @param applicationData A map containing student_id and job_posting_id.
     * @return The created application.
     */
    @PostMapping("/apply")
    public ResponseEntity<Application> applyToJob(@RequestBody Map<String, Long> applicationData) {
        Long studentId = applicationData.get("student_id");
        Long jobPostingId = applicationData.get("job_posting_id");

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

    // TODO : Additional endpoints (update application status)
}
