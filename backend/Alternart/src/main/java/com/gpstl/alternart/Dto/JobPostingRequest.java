package com.gpstl.alternart.Dto;

import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingRequest {

    private Long companyId; // ID of the company creating the job posting

    private String positionTitle;

    private String duration;

    private String requiredSkills;

    private Set<Long> categoryIds; // IDs of the categories associated with the job posting
}
