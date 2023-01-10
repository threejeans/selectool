package com.selectool.social.naver;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class NaverRes {
    private String resultcode;

    private String message;

    private NaverUser response;
}
