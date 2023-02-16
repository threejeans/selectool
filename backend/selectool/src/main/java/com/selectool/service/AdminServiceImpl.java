package com.selectool.service;

import com.selectool.config.JwtAdminUtil;
import com.selectool.dto.request.CodeRequest;
import com.selectool.dto.request.EmailRequest;
import com.selectool.dto.response.ServiceTokenResponse;
import com.selectool.entity.Admin;
import com.selectool.entity.AuthAdmin;
import com.selectool.entity.Code;
import com.selectool.exception.NotFoundException;
import com.selectool.exception.NotMatchException;
import com.selectool.repository.AdminRepo;
import com.selectool.repository.AuthAdminRepo;
import com.selectool.repository.CodeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

import static com.selectool.exception.NotFoundException.ADMIN_CODE_NOT_FOUND;
import static com.selectool.exception.NotFoundException.ADMIN_NOT_FOUND;
import static com.selectool.exception.NotMatchException.ADMIN_CODE_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class AdminServiceImpl implements AdminService {
    private final AdminRepo adminRepo;

    private final CodeRepo codeRepo;

    private final AuthAdminRepo authAdminRepo;

    private final EmailService emailService;

    private final JwtAdminUtil jwtAdminUtil;

    private final String codeContent = "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">관리자 본인 확인</h1>"
            + "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 관리자 로그인 화면에 입력해주세요.</p>"
            + "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";

    // 코드 만료 시간 10분
    private Long CODE_EXPIRATION = 10L;

    // refreshToken 만료 시간
    @Value("${token.refresh_token.expiration_time}")
    private Long REFRESH_EXPIRATION;

    @Override
    @Transactional
    public void sendCode(CodeRequest request) throws Exception {
        // 관리자 이메일 체크
        adminRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException(ADMIN_NOT_FOUND));

        // 메일 제목 생성
        String title = "SELECTOOL 관리자 로그인 인증 코드";

        // 메일 내용 생성
        String code = createCode();

        String content = codeContent;
        content += code + "</td></tr></tbody></table></div>";
        log.info("코드: " + code);
        // 코드 저장
        codeRepo.save(
                Code.builder()
                        .email(request.getEmail())
                        .code(code)
                        .expiration(CODE_EXPIRATION)
                        .build()
        );

        // 해당 이메일로 인증 코드 보내기
        emailService.sendEmail(
                EmailRequest.builder()
                        .address(request.getEmail())
                        .title(title)
                        .content(content)
                        .build()
        );
    }

    // 인증 코드 생성
    public static String createCode() {
        StringBuilder code = new StringBuilder();
        Random rnd = new Random();

        // 인증 코드 6자리
        for (int i = 0; i < 6; i++) {
            code.append((rnd.nextInt(10)));
        }
        return code.toString();
    }

    @Override
    @Transactional
    public ServiceTokenResponse login(CodeRequest request) {
        // 관리자 이메일 체크
        Admin admin = adminRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException(ADMIN_NOT_FOUND));

        // 코드 존재 확인
        Code code = codeRepo.findById(request.getEmail())
                .orElseThrow(() -> new NotFoundException(ADMIN_CODE_NOT_FOUND));

        // 코드가 일치하지 않는 경우
        if (!code.getCode().equals(request.getAuth().trim())) {
            throw new NotMatchException(ADMIN_CODE_NOT_MATCH);
        }

        // 확인한 코드 제거
        codeRepo.delete(code);

        // 관리자 토큰 발급
        String accessToken = jwtAdminUtil.createAccessToken(admin.getId());
        String refreshToken = jwtAdminUtil.createRefreshToken(admin.getId());
        AuthAdmin authAdmin = AuthAdmin.builder()
                .adminId(admin.getId())
                .refreshToken(refreshToken)
                .expiration(REFRESH_EXPIRATION)
                .build();
        authAdminRepo.save(authAdmin);

        return ServiceTokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
