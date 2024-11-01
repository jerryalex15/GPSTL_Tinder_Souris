package com.gpstl.alternart.Repositories;

import com.gpstl.alternart.Models.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByCategories_Id(Long categoryId);
}