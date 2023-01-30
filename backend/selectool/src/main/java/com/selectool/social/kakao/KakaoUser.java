package com.selectool.social.kakao;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoUser {
    private KakaoProfile profile;

    private String name;

    private String email;
}
