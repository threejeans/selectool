package com.selectool.dto.user.response;

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

    private String subscribeEmail;

    private String image;

    private Boolean active;

    @Builder
    public UserResponse(Long id, String name, String type, String email, String subscribeEmail, String image, Boolean active) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.email = email;
        this.subscribeEmail = subscribeEmail;
        this.image = image;
        this.active = active;
    }
}
