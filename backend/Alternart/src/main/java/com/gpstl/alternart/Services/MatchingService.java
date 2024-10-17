package com.gpstl.alternart.Services;

import com.gpstl.alternart.Models.Category;
import com.gpstl.alternart.Models.JobPosting;
import com.gpstl.alternart.Models.Student;
import com.gpstl.alternart.Repositories.JobPostingRepository;
import com.gpstl.alternart.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    /**
     * Finds matching job postings for a given student based on shared categories.
     *
     * @param studentId The ID of the student.
     * @return A list of matching job postings.
     */
    public List<JobPosting> findMatchingJobPostings(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Set<Category> studentCategories = student.getCategories();

        // Fetch all job postings that share at least one category with the student
        List<JobPosting> allJobPostings = jobPostingRepository.findAll();

        return allJobPostings.stream()
                .filter(job -> job.getCategories().stream().anyMatch(studentCategories::contains))
                .collect(Collectors.toList());
    }

    /**
     * Finds matching students for a given job posting based on shared categories.
     *
     * @param jobPostingId The ID of the job posting.
     * @return A list of matching students.
     */
    public List<Student> findMatchingStudents(Long jobPostingId) {
        JobPosting jobPosting = jobPostingRepository.findById(jobPostingId)
                .orElseThrow(() -> new RuntimeException("Job Posting not found"));

        Set<Category> jobCategories = jobPosting.getCategories();

        // Fetch all students that share at least one category with the job posting
        List<Student> allStudents = studentRepository.findAll();

        return allStudents.stream()
                .filter(student -> student.getCategories().stream().anyMatch(jobCategories::contains))
                .collect(Collectors.toList());
    }
}
