package com.accolite.benchManagement.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenDTO {
    private String userId;
    private String empId;
    private String email;
    private String name;
    private String role;
    private String accessToken;
    private String refreshToken;
}
