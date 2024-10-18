// JobPostingDTO.java
package com.gpstl.alternart.Dto;

import lombok.*;

import org.antlr.v4.runtime.misc.NotNull;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostingDTO {
    private Long id;

    @NotNull
    private Long companyId;

    private String positionTitle;

    private String duration;

    private String requiredSkills;

    private LocalDateTime createdAt;

    private Set<Long> categoryIds;
}
