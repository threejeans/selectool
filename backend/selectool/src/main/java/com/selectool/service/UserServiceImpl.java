package com.selectool.service;

import com.selectool.config.Constant;
import com.selectool.dto.user.request.CodeRequest;
import com.selectool.dto.user.request.EmailRequest;
import com.selectool.dto.user.request.UserCreateRequest;
import com.selectool.dto.user.request.UserUpdateRequest;
import com.selectool.dto.user.response.UserResponse;
import com.selectool.entity.Code;
import com.selectool.entity.User;
import com.selectool.exception.NotAuthorizedException;
import com.selectool.exception.NotFoundException;
import com.selectool.exception.NotMatchException;
import com.selectool.repository.CodeRepo;
import com.selectool.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static com.selectool.exception.NotAuthorizedException.NOT_ACTIVE_USER;
import static com.selectool.exception.NotFoundException.*;
import static com.selectool.exception.NotMatchException.*;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;

    private final CodeRepo codeRepo;

    private final EmailService emailService;

    private final String EMAIL_SUFFIX = "+check";

    @Transactional
    @Override
    public UserResponse getUser(Constant.SocialLoginType socialLoginType, UserCreateRequest request) {
        switch (socialLoginType) {
            case GOOGLE:
            case NAVER:
            case KAKAO: {
                User user = userRepo.findByTypeAndEmail(socialLoginType.name(), request.getEmail())
                        .orElseGet(() -> {
                            User newUser = User.builder()
                                    .name(request.getName())
                                    .type(socialLoginType.name())
                                    .email(request.getEmail())
                                    .image(request.getImage())
                                    .build();
                            userRepo.save(newUser);
                            return newUser;
                        });
                if (!user.getActive()) {
                    throw new NotAuthorizedException(NOT_ACTIVE_USER);
                }
                return UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build();
            }
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 유저 형식입니다.");
            }
        }
    }

    @Override
    public UserResponse getUserInfo(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .type(user.getType())
                .email(user.getEmail())
                .subscribeEmail(user.getSubscribeEmail())
                .image(user.getImage())
                .subscribeActive(user.getSubscribeActive())
                .emailVerified(user.getEmailVerified())
                .build();
    }

    @Override
    @Transactional
    public void updateUserInfo(UserUpdateRequest request, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.updateInfo(request.getName(), request.getImage(), request.getSubscribeActive());
        userRepo.save(user);
    }

    @Override
    @Transactional
    public void withdraw(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.withdraw();
        userRepo.save(user);
    }

    @Override
    @Transactional
    public void sendVerificationEmail(Long userId, CodeRequest request) throws Exception {
        // 유저 이메일 미인증 상태로 전환
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.verifyEmail(request.getEmail(), false);

        // 이메일 인증 진행
        String BASE_URL = "https://www.selectool.info/api/member/info/email?";

        String uuid = UUID.randomUUID().toString();
        log.info("UUID: {}", uuid);

        String email = request.getEmail();
        log.info("Email: {}", email);

        // 이메일 인증 링크
        String link = BASE_URL + "userId=" + userId + "&email=" + email + "&code=" + uuid;
        log.info("Link: {}", link);

        // 메일 제목 생성
        String title = "SELECTOOL 구독 메일 인증";

        // 메일 내용 생성
        String content = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "  <head> </head>\n" +
                "  <body>\n" +
                "    <div\n" +
                "      style=\"\n" +
                "        font-family: 'Apple SD Gothic Neo', 'sans-serif' !important;\n" +
                "        width: 540px;\n" +
                "        height: 600px;\n" +
                "        border-top: 4px solid #60a9f6;\n" +
                "        margin: 100px auto;\n" +
                "        padding: 30px 0;\n" +
                "        box-sizing: border-box;\n" +
                "      \"\n" +
                "    >\n" +
                "      <h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 600\">\n" +
                "        <span style=\"font-size: 15px; margin: 0 0 10px 3px\">SELECTOOL</span\n" +
                "        ><br />\n" +
                "        <span style=\"color: #60a9f6\">메일 인증</span> 안내입니다.\n" +
                "      </h1>\n" +
                "      <p\n" +
                "        style=\"\n" +
                "          font-size: 16px;\n" +
                "          line-height: 26px;\n" +
                "          margin-top: 50px;\n" +
                "          padding: 0 5px;\n" +
                "        \"\n" +
                "      >\n" +
                "        SELECTOOL 구독 서비스를 이용해주셔서 감사합니다. <br />\n" +
                "        아래 <b style=\"color: #60a9f6\">'메일 인증'</b> 버튼을 클릭하여 구독\n" +
                "        이메일 인증을 완료해 주세요.<br />\n" +
                "        감사합니다.\n" +
                "      </p>\n" +
                "      <a\n" +
                "        style=\"color: #fff; text-decoration: none; text-align: center\"\n" +
                "        href=\"" + link + "\"\n" +
                "      >\n" +
                "        <b\n" +
                "          style=\"\n" +
                "            display: inline-block;\n" +
                "            width: 210px;\n" +
                "            height: 45px;\n" +
                "            margin: 30px 5px 40px;\n" +
                "            background: #60a9f6;\n" +
                "            line-height: 45px;\n" +
                "            vertical-align: middle;\n" +
                "            font-size: 16px;\n" +
                "          \"\n" +
                "        >\n" +
                "          메일 인증\n" +
                "        </b>\n" +
                "      </a>\n" +
                "      <div style=\"border-top: 1px solid #ddd; padding: 5px\"></div>\n" +
                "    </div>\n" +
                "  </body>\n" +
                "</html>\n";


        codeRepo.save(
                Code.builder()
                        .email(email + EMAIL_SUFFIX)
                        .code(uuid)
                        .expiration(10L)
                        .build()
        );

        // 해당 이메일로 인증 메일 보내기
        emailService.sendEmail(
                EmailRequest.builder()
                        .address(email)
                        .title(title)
                        .content(content)
                        .build()
        );
    }

    @Override
    @Transactional
    public void VerifyEmail(Long userId, CodeRequest request) {
        // 유저 확인
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        // 구독용 메일 일치 여부
        if (!user.getSubscribeEmail().equals(request.getEmail())){
            throw new NotMatchException(SUBSCRIBE_EMAIL_NOT_MATCH);
        }

        // 코드 존재 확인
        Code code = codeRepo.findById(request.getEmail() + EMAIL_SUFFIX)
                .orElseThrow(() -> new NotFoundException(EMAIL_VERIFY_CODE_NOT_FOUND));

        // 코드가 일치하지 않는 경우
        if (!code.getCode().equals(request.getAuth().trim())) {
            throw new NotMatchException(EMAIL_VERIFY_CODE_NOT_MATCH);
        }

        // 확인한 코드 제거
        codeRepo.delete(code);

        // 인증 확인
        user.verifyEmail(request.getEmail(), true);
    }
}
