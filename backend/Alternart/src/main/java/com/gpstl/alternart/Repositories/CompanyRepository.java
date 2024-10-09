package com.gpstl.alternart.Repositories;


import com.gpstl.alternart.Models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
