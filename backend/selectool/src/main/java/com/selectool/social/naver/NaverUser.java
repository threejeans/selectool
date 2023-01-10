package com.selectool.social.naver;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NaverUser {
    private String resultcode;

    private String message;

    private String id;

    private String email;

    private Integer age;

    private String nickname;

    private String profile_image;
}
