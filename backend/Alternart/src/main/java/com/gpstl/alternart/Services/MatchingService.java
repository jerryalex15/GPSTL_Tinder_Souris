// MatchingServiceImpl.java
package com.gpstl.alternart.Services;
import com.gpstl.alternart.Dto.JobPostingDTO;
import com.gpstl.alternart.Dto.StudentDTO;
import com.gpstl.alternart.Models.Category;
import com.gpstl.alternart.Models.JobPosting;
import com.gpstl.alternart.Models.Student;
import com.gpstl.alternart.Repositories.JobPostingRepository;
import com.gpstl.alternart.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MatchingService  {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    /**
     * Finds matching job postings for a given student based on shared categories.
     *
     * @param studentUserId The ID of the student.
     * @return A list of matching JobPostingDTOs.
     */
    public List<JobPostingDTO> findMatchingJobPostings(Long studentUserId) {

        Long studentId = studentRepository.findByUserId(studentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with User ID: " + studentUserId))
                .getId();

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        Set<Category> studentCategories = student.getCategories();

        List<JobPosting> matchingJobs = jobPostingRepository.findAll().stream()
                //.filter(job -> job.getCategories().stream().anyMatch(studentCategories::contains))
                .toList();

        return matchingJobs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Finds matching students for a given job posting based on shared categories.
     *
     * @param jobPostingId The ID of the job posting.
     * @return A list of matching StudentDTOs.
     */
    public List<StudentDTO> findMatchingStudents(Long jobPostingId) {
        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found with ID: " + jobPostingId));

        Set<Category> jobCategories = jobPosting.getCategories();

        List<Student> matchingStudents = studentRepository.findAll().stream()
                .filter(student -> student.getCategories().stream().anyMatch(jobCategories::contains))
                .collect(Collectors.toList());

        return matchingStudents.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Mapper methods
    private JobPostingDTO convertToDTO(JobPosting job) {
        return new JobPostingDTO(
                job.getId(),
                job.getCompany().getId(),
                job.getPositionTitle(),
                job.getDuration(),
                job.getRequiredSkills(),
                job.getCreatedAt(),
                job.getCategories().stream().map(Category::getId).collect(Collectors.toSet())
        );
    }

    private StudentDTO convertToDTO(Student student) {
        return new StudentDTO(
                student.getId(),
                student.getUser().getId(),
                student.getCvLink(),
                student.getVideoPresentationLink(),
                student.getPortfolioLink(),
                student.getKeySkills(),
                student.getCategories().stream().map(Category::getId).collect(Collectors.toList())
        );
    }
}
