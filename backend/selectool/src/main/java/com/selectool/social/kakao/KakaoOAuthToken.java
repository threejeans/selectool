package com.selectool.social.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoOAuthToken {
    private String access_token;

    private String refresh_token;

    private int expires_in;

    private int refresh_token_expires_in;

    private String scope;

    private String token_type;

    private String id_token;
}
