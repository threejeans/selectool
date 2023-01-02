package com.selectool.social;

import org.springframework.http.ResponseEntity;

public interface SocialOauth {
//    String getOauthRedirectURL();

    ResponseEntity<String> requestAccessToken(String code);
}
