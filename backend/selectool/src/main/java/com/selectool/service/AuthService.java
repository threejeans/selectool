package com.selectool.service;


import com.selectool.dto.response.ServiceTokenResponse;

public interface AuthService {
    //토큰 재발급
    public ServiceTokenResponse refresh(String refreshToken, Long userId);
}
