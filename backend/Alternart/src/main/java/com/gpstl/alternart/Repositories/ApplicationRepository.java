package com.gpstl.alternart.Repositories;


import com.gpstl.alternart.Models.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudentId(Long studentId);
    List<Application> findByJobPostingId(Long jobPostingId);

    List<Application> findByStudentIdAndJobPostingId(Long studentId, Long jobPostingId);

    // Add a method to find all applications by job posting ID and super like
    List<Application> findByJobPostingIdAndSuperLikeTrue(Long jobPostingId);
    List<Application> findByJobPostingIdAndSuperLikeFalse(Long jobPostingId);

}