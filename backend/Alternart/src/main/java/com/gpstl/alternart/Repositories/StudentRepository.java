package com.gpstl.alternart.Repositories;

import com.gpstl.alternart.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}