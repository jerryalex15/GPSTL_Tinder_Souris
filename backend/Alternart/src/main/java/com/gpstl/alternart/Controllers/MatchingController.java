package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Models.JobPosting;
import com.gpstl.alternart.Models.Student;
import com.gpstl.alternart.Services.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/match")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    /**
     * Get matching job postings for a specific student.
     *
     * @param studentId The ID of the student.
     * @return A list of matching job postings.
     */
    @GetMapping("/student/{studentId}/jobs")
    public ResponseEntity<List<JobPosting>> getMatchingJobs(@PathVariable Long studentId) {
        List<JobPosting> matches = matchingService.findMatchingJobPostings(studentId);
        return ResponseEntity.ok(matches);
    }

    /**
     * Get matching students for a specific job posting.
     *
     * @param jobPostingId The ID of the job posting.
     * @return A list of matching students.
     */
    @GetMapping("/job/{jobPostingId}/students")
    public ResponseEntity<List<Student>> getMatchingStudents(@PathVariable Long jobPostingId) {
        List<Student> matches = matchingService.findMatchingStudents(jobPostingId);
        return ResponseEntity.ok(matches);
    }
}
