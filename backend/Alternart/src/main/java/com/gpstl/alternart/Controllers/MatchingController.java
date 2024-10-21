package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Dto.JobPostingDTO;
import com.gpstl.alternart.Dto.StudentDTO;
import com.gpstl.alternart.Models.JobPosting;
import com.gpstl.alternart.Models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import com.gpstl.alternart.Services.MatchingService;
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
    public ResponseEntity<List<JobPostingDTO>> getMatchingJobs(@PathVariable Long studentId) {
        List<JobPostingDTO> matches = matchingService.findMatchingJobPostings(studentId);
        return ResponseEntity.ok(matches);
    }

    /**
     * Get matching students for a specific job posting.
     *
     * @param jobPostingId The ID of the job posting.
     * @return A list of matching students.
     */
    @GetMapping("/job/{jobPostingId}/students")
    public ResponseEntity<List<StudentDTO>> getMatchingStudents(@PathVariable Long jobPostingId) {
        List<StudentDTO> matches = matchingService.findMatchingStudents(jobPostingId);
        return ResponseEntity.ok(matches);
    }
}
