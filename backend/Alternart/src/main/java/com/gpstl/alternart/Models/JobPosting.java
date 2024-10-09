package com.gpstl.alternart.Models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "job_postings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String positionTitle;

    private String duration;

    @Column(length = 1000)
    private String requiredSkills;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}