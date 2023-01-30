package com.selectool.social.naver;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
public class NaverOAuthToken {
    private String access_token;

    private String refresh_token;

    private int expires_in;

    private String token_type;
}
