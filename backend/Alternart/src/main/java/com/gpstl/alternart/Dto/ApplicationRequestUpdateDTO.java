package com.gpstl.alternart.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequestUpdateDTO extends ApplicationRequestDTO {
    private String status;
}
