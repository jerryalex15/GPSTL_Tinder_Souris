package com.gpstl.alternart.Dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

    private String username;
    private String password;
    private String email;
    private String role;

}
