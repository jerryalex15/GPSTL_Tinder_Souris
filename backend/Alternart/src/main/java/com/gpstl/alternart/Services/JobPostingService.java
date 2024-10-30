// JobPostingService.java
package com.gpstl.alternart.Services;

import com.gpstl.alternart.Dto.JobPostingRequest;
import com.gpstl.alternart.Dto.JobPostingResponse;
import com.gpstl.alternart.Models.Category;
import com.gpstl.alternart.Models.Company;
import com.gpstl.alternart.Models.JobPosting;
import com.gpstl.alternart.Repositories.CategoryRepository;
import com.gpstl.alternart.Repositories.CompanyRepository;
import com.gpstl.alternart.Repositories.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public JobPostingResponse createJobPosting(JobPostingRequest jobPostingRequest) {
        // Validate company
        Company company = companyRepository.findById(jobPostingRequest.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with ID: " + jobPostingRequest.getCompanyId()));

        // Fetch categories
        Set<Category> categories = new HashSet<>();
        if (jobPostingRequest.getCategoryIds() != null && !jobPostingRequest.getCategoryIds().isEmpty()) {
            categories = new HashSet<>(categoryRepository.findAllById(jobPostingRequest.getCategoryIds()));
            if (categories.size() != jobPostingRequest.getCategoryIds().size()) {
                throw new ResourceNotFoundException("One or more categories not found");
            }
        }

        // Create JobPosting entity
        JobPosting jobPosting = new JobPosting();
        jobPosting.setId(null); // Ensure ID is not set
        jobPosting.setCompany(company);
        jobPosting.setPositionTitle(jobPostingRequest.getPositionTitle());
        jobPosting.setDuration(jobPostingRequest.getDuration());
        jobPosting.setRequiredSkills(jobPostingRequest.getRequiredSkills());
        jobPosting.setCategories(categories);

        JobPosting savedJobPosting = jobPostingRepository.save(jobPosting);

        return mapToResponse(savedJobPosting);
    }

    public List<JobPostingResponse> getAllJobPostings() {
        List<JobPosting> jobPostings = jobPostingRepository.findAll();
        return jobPostings.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<JobPostingResponse> getAllJobPostingsByCompany(Long companyId) {
        // query the database for all job postings by the company

        List<JobPosting> jobPostings = jobPostingRepository.findAll();
        return jobPostings.stream()
                .filter(jobPosting -> jobPosting.getCompany().getId().equals(companyId))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public JobPostingResponse getJobPostingById(Long jobPostingId) {
        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with ID: " + jobPostingId));
        return mapToResponse(jobPosting);
    }

    @Transactional
    public JobPostingResponse updateJobPosting(Long jobPostingId, JobPostingRequest jobPostingRequest) {
        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with ID: " + jobPostingId));

        // Ensure the company is the owner (optional, based on your security implementation)
        if (!jobPosting.getCompany().getId().equals(jobPostingRequest.getCompanyId())) {
            throw new SecurityException("Unauthorized to update this job posting");
        }

        // Update fields
        jobPosting.setPositionTitle(jobPostingRequest.getPositionTitle());
        jobPosting.setDuration(jobPostingRequest.getDuration());
        jobPosting.setRequiredSkills(jobPostingRequest.getRequiredSkills());

        // Update categories
        Set<Category> categories = new HashSet<>();
        if (jobPostingRequest.getCategoryIds() != null && !jobPostingRequest.getCategoryIds().isEmpty()) {
            categories = new HashSet<>(categoryRepository.findAllById(jobPostingRequest.getCategoryIds()));
            if (categories.size() != jobPostingRequest.getCategoryIds().size()) {
                throw new ResourceNotFoundException("One or more categories not found");
            }
        }
        jobPosting.setCategories(categories);

        JobPosting updatedJobPosting = jobPostingRepository.save(jobPosting);
        return mapToResponse(updatedJobPosting);
    }

    @Transactional
    public void deleteJobPosting(Long jobPostingId) {
        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with ID: " + jobPostingId));
        jobPostingRepository.delete(jobPosting);
    }

    // Helper method to map JobPosting entity to JobPostingResponse DTO
    private JobPostingResponse mapToResponse(JobPosting jobPosting) {
        JobPostingResponse response = new JobPostingResponse();
        response.setId(jobPosting.getId());
        response.setCompanyId(jobPosting.getCompany().getId());
        response.setPositionTitle(jobPosting.getPositionTitle());
        response.setDuration(jobPosting.getDuration());
        response.setRequiredSkills(jobPosting.getRequiredSkills());
        response.setCreatedAt(jobPosting.getCreatedAt());

        Set<JobPostingResponse.CategoryResponse> categoryResponses = jobPosting.getCategories().stream()
                .map(category -> new JobPostingResponse.CategoryResponse(category.getId(), category.getName()))
                .collect(Collectors.toSet());
        response.setCategories(categoryResponses);

        return response;
    }

    public Long getCompanyID(Long companyUserID) {
        return companyRepository.findByUser_Id(companyUserID)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with User ID: " + companyUserID))
                .getId();
    }
}
