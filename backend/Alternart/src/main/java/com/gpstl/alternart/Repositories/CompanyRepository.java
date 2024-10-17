package com.gpstl.alternart.Repositories;


import com.gpstl.alternart.Models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    // Find company by user ID
    Optional<Company> findByUser_Id(Long userId);
}
