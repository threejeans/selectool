package com.selectool.controller;

import com.selectool.config.Constant;
import com.selectool.config.login.LoginUser;
import com.selectool.config.login.User;
import com.selectool.dto.user.request.CodeRequest;
import com.selectool.dto.user.request.UserUpdateRequest;
import com.selectool.dto.user.response.ServiceTokenResponse;
import com.selectool.dto.user.response.UserResponse;
import com.selectool.service.AuthService;
import com.selectool.service.OAuthService;
import com.selectool.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Api(tags = "유저")
public class UserController {
    private final AuthService authService;
    private final OAuthService oAuthService;
    private final UserService userService;

    @Value("${token.refresh_token.expiration_time}")
    private Long REFRESH_EXPIRATION;

    @GetMapping("/login/{socialLoginType}")
    @ApiOperation(value = "로그인 토큰 발급")
    public ResponseEntity<?> callback(
            @ApiParam(value = "소셜 로그인 타입") @PathVariable(name = "socialLoginType") String socialLoginPath,
            @ApiParam(value = "해당 소셜 로그인시 받은 코드") @RequestParam(name = "code") String code,
            HttpServletResponse response
    ) throws IOException {
        Constant.SocialLoginType socialLoginType = Constant.SocialLoginType.valueOf(socialLoginPath.toUpperCase());
        ServiceTokenResponse tokenResponse = oAuthService.oAuthLogin(socialLoginType, code);
        HttpHeaders headers = new HttpHeaders();
        headers.add("access-token", tokenResponse.getAccessToken());
        Cookie cookie = new Cookie("refresh-token", tokenResponse.getRefreshToken());
        cookie.setMaxAge(REFRESH_EXPIRATION.intValue());
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setDomain("");
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .build();
    }

    @GetMapping("/refresh")
    @ApiOperation(value = "액세스 토큰 재발급")
    public ResponseEntity<?> refresh(
            @CookieValue("refresh-token") String refreshToken
    ) {
        try {
            return ResponseEntity.ok(authService.refresh(refreshToken));
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 만료");
        }
    }

    @GetMapping("/info")
    @ApiOperation(value = "유저 정보 조회")
    public ResponseEntity<UserResponse> getUserInfo(
            @LoginUser User user
    ) {
        return ResponseEntity.ok(userService.getUserInfo(user.getId()));
    }

    @PutMapping("/info")
    @ApiOperation(value = "유저 정보 수정")
    public ResponseEntity<?> updateUserInfo(
            @LoginUser User user,
            @RequestBody UserUpdateRequest request
    ) {
        userService.updateUserInfo(request, user.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/withdraw")
    @ApiOperation(value = "유저 비활성화")
    public ResponseEntity<?> User(
            @LoginUser User user
    ) {
        userService.withdraw(user.getId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/info/email")
    @ApiOperation(value = "이메일 인증 메일 전송")
    public ResponseEntity<?> sendVerificationEmail(
            @LoginUser User user,
            @RequestBody CodeRequest request
    ) throws Exception {
        userService.sendVerificationEmail(user.getId(), request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/info/email")
    @ApiOperation(value = "이메일 인증 확인")
    public ResponseEntity<?> VerifyEmail(
            @RequestParam Long userId,
            @RequestParam String email,
            @RequestParam String code
    ) {
        userService.VerifyEmail(userId, new CodeRequest(email, code));
        return ResponseEntity.ok().build();
    }
}
