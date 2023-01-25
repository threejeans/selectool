package com.selectool.service;

import com.selectool.dto.request.CodeRequest;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface AdminService {
    // 인증 코드 메일 보내기
    public void sendCode(CodeRequest request) throws Exception;
    // 인증 코드 확인 및 로그인
    public void login(CodeRequest request);
}
