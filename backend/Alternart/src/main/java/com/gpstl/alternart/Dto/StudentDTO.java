package com.gpstl.alternart.Dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {

    private Long id;
    private Long userId;
    private String cvLink;
    private String videoPresentationLink;
    private String portfolioLink;
    private String keySkills;
    private List<Long> categoryIds;

}