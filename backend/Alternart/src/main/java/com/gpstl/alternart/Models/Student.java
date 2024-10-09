package com.gpstl.alternart.Models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String cvLink;
    private String videoPresentationLink;
    private String portfolioLink;

    @Column(length = 1000)
    private String keySkills;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
