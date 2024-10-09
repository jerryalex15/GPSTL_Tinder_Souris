package com.gpstl.alternart.Dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {

        private String username;
        private String password;

}
