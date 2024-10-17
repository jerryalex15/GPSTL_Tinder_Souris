package com.gpstl.alternart.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // Constructors, Getters, Setters

    @ManyToMany(mappedBy = "categories")
    private Set<Student> students;

    @ManyToMany(mappedBy = "categories")
    private Set<JobPosting> jobPostings;

}
