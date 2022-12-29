package com.selectool.social.google;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GoogleOAuthToken {
    private String access_token;

    private int expires_in;

    private String scope;

    private String token_type;

    private String id_token;
}
