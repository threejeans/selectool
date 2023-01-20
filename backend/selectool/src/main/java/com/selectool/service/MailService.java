package com.selectool.service;

import com.selectool.dto.request.MailRequest;

public interface MailService {
    MailRequest createMail(String userEmail);
    void sendMail(MailRequest mailRequest);
}
