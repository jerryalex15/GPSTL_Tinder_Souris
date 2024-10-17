package com.gpstl.alternart.Repositories;

import com.gpstl.alternart.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // find student by user id
    Optional<Student> findByUserId(Long userId);
}