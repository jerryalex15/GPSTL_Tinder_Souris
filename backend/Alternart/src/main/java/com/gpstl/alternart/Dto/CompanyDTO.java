package com.gpstl.alternart.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO {
    private Long id;
    private Long userId;
    private String companyName;
    private String logoUrl;
    private String description;
    private String perks;

    private byte[] photo;
}