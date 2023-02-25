package com.selectool.service;


import com.selectool.config.Constant;
import com.selectool.dto.user.response.ServiceTokenResponse;

import java.io.IOException;

public interface OAuthService {
    // 소셜 로그인
    public ServiceTokenResponse oAuthLogin(Constant.SocialLoginType socialLoginType, String code) throws IOException;
}
