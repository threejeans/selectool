package com.selectool.service;


import com.selectool.config.Constant;
import com.selectool.dto.user.request.UserCreateRequest;
import com.selectool.dto.user.request.UserUpdateRequest;
import com.selectool.dto.user.response.UserResponse;

public interface UserService {
    //회원가입
    public UserResponse getUser(Constant.SocialLoginType socialLoginType, UserCreateRequest request);

    //유저정보조회
    public UserResponse getUserInfo(Long userId);

    //유저정보수정(이름, 구독 메일, 이미지)
    public void updateUserInfo(UserUpdateRequest request, Long userId);

    // 회원탈퇴 (비활성화)
    public void withdraw(Long userId);
}
