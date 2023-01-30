package com.selectool.service;

import com.selectool.dto.request.EmailRequest;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    public MimeMessage createEmail(EmailRequest emailRequest) throws MessagingException, UnsupportedEncodingException;
    public void sendEmail(EmailRequest emailRequest) throws Exception;
}
