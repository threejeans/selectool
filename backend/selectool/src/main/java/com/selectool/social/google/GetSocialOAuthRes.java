package com.selectool.social.google;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GetSocialOAuthRes {
    private String jwt_token;

    private int user_num;

    private String access_token;

    private String token_type;
}
