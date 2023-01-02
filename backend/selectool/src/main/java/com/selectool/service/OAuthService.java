package com.selectool.service;


import com.selectool.config.Constant;
import com.selectool.dto.response.ServiceTokenResponse;

import java.io.IOException;

public interface OAuthService {

    public ServiceTokenResponse oAuthLogin(Constant.SocialLoginType socialLoginType, String code) throws IOException;
}
