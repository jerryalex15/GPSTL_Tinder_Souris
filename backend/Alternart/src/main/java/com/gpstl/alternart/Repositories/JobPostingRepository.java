package com.gpstl.alternart.Repositories;

import com.gpstl.alternart.Models.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
}