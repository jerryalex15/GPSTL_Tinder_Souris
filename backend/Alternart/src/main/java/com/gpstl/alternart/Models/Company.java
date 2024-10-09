package com.gpstl.alternart.Models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String companyName;

    private String logoUrl;

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String perks;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
