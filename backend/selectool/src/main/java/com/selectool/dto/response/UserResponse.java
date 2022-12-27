package com.selectool.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse {
    private Long id;

    private String name;

    private String image;

    @Builder
    public UserResponse(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}
