package com.gpstl.alternart.Dto;

import lombok.*;
import java.util.List;
import jakarta.annotation.Nonnull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {

    private Long id;
    @Nonnull
    private Long userId;
    private String cvLink;
    private String videoPresentationLink;
    private String portfolioLink;
    private String keySkills;
    private List<Long> categoryIds;

}