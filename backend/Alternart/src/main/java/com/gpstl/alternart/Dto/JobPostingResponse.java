package com.gpstl.alternart.Dto;

import com.gpstl.alternart.Models.Category;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingResponse {

    private Long id;

    private Long companyId;

    private String positionTitle;

    private String duration;

    private String requiredSkills;

    private LocalDateTime createdAt;

    private Set<CategoryResponse> categories;

    // Inner DTO for Category
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryResponse {
        private Long id;
        private String name;
    }
}
