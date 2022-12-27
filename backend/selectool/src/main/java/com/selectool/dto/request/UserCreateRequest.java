package com.selectool.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserCreateRequest {
    private String name;

    private String email;

    private String image;

    @Builder
    public UserCreateRequest(String name, String email, String image) {
        this.name = name;
        this.email = email;
        this.image = image;
    }
}
