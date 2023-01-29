package com.selectool.service;

import com.selectool.dto.request.EmailRequest;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    // 보낼 이메일 생성
    public MimeMessage createEmail(EmailRequest emailRequest) throws MessagingException, UnsupportedEncodingException;

    // 이메일 전송
    public void sendEmail(EmailRequest emailRequest) throws Exception;
}
