package com.gpstl.alternart.Models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

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


    @ManyToMany
    @JoinTable(
            name = "student_categories",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;

    public Student(Long studentId) {
        this.id = studentId;
    }
}
