package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Dto.JobPostingRequest;
import com.gpstl.alternart.Dto.JobPostingResponse;
import com.gpstl.alternart.Services.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/job_postings")
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    /**
     * Create a new Job Posting
     * Accessible only by users with 'company' role
     */
    @PostMapping
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<JobPostingResponse> createJobPosting(@RequestBody JobPostingRequest jobPostingRequest) {
        try {
            // id of the company creating the job posting, need to get it using the userid
            Long company_UserID = jobPostingRequest.getCompanyId();
            Long companyID = jobPostingService.getCompanyID(company_UserID);
            System.out.println("Je suis ici");
            jobPostingRequest.setCompanyId(companyID);
            JobPostingResponse response = jobPostingService.createJobPosting(jobPostingRequest);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(null);
        }
    }

    /**
     * Get all Job Postings
     * Accessible by any authenticated user
     */
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<JobPostingResponse>> getAllJobPostings() {
        List<JobPostingResponse> jobPostings = jobPostingService.getAllJobPostings();
        return ResponseEntity.ok(jobPostings);
    }

    // Méthode de filtrage par catégorie
    @GetMapping("/by-category")
    //GET /api/job_postings/by-category?categoryId=<ID de la catégorie>
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<JobPostingResponse>> getJobPostingsByCategory(@RequestParam Long categoryId) {
        List<JobPostingResponse> jobPostings = jobPostingService.getJobPostingsByCategory(categoryId);
        return ResponseEntity.ok(jobPostings);
    }

    @GetMapping("/company/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<JobPostingResponse>> getJobPostingsByCompanyId(@PathVariable("id") Long companyUserId) {
        Long companyId = jobPostingService.getCompanyID(companyUserId);
        List<JobPostingResponse> jobPostings = jobPostingService.getAllJobPostingsByCompany(companyId);
        return ResponseEntity.ok(jobPostings);
    }

    /**
     * Get Job Posting by ID
     * Accessible by any authenticated user
     */
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<JobPostingResponse> getJobPostingById(@PathVariable("id") Long jobPostingId) {
        try {
            JobPostingResponse response = jobPostingService.getJobPostingById(jobPostingId);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update Job Posting
     * Accessible only by users with 'company' role
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<JobPostingResponse> updateJobPosting(@PathVariable("id") Long jobPostingId,
                                                               @RequestBody JobPostingRequest jobPostingRequest) {
        try {
            JobPostingResponse response = jobPostingService.updateJobPosting(jobPostingId, jobPostingRequest);
            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(null);
        }
    }

    /**
     * Delete Job Posting
     * Accessible only by users with 'company' role
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<Void> deleteJobPosting(@PathVariable("id") Long jobPostingId) {
        try {
            jobPostingService.deleteJobPosting(jobPostingId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
