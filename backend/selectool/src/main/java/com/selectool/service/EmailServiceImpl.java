package com.selectool.service;

import com.selectool.dto.request.EmailRequest;
import com.selectool.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

import static com.selectool.exception.BadRequestException.EMAIL_SERVICE_BAD_REQUEST;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String id;

    @Override
    public MimeMessage createEmail(EmailRequest emailRequest) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, emailRequest.getAddress());
        message.setSubject(emailRequest.getTitle());

        message.setText(emailRequest.getContent(), "utf-8", "html"); //내용, charset타입, subtype
        message.setFrom(new InternetAddress(id,"SELECTOOL_ADMIN")); //보내는 사람의 메일 주소, 보내는 사람 이름

        return message;
    }

    @Override
    public void sendEmail(EmailRequest emailRequest) throws Exception {
        MimeMessage message = createEmail(emailRequest);

        try {
            javaMailSender.send(message);
        } catch (MailException me) {
            me.printStackTrace();
            throw new BadRequestException(EMAIL_SERVICE_BAD_REQUEST);
        }
    }
}
