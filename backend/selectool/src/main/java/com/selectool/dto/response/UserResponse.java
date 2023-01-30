package com.selectool.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse {
    private Long id;

    private String name;

    private String type;

    private String email;

    private String image;

    @Builder
    public UserResponse(Long id, String name, String type, String email, String image) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.email = email;
        this.image = image;
    }
}
