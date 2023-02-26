package com.selectool.dto.user.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CodeRequest {
    private String email;

    private String auth;

    @Builder
    public CodeRequest(String email, String auth) {
        this.email = email;
        this.auth = auth;
    }
}
