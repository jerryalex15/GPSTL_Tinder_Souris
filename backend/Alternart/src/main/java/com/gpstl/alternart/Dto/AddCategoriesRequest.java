// AddCategoriesRequest.java
package com.gpstl.alternart.Dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddCategoriesRequest {
    private List<Long> categoryIds;
    private Long studentUserId;
}
