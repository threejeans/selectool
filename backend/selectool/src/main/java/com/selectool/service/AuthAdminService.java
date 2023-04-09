package com.selectool.service;


import com.selectool.dto.user.response.ServiceTokenResponse;

public interface AuthAdminService {
    //토큰 재발급
    public ServiceTokenResponse refresh(String refreshToken);
}
