package com.selectool.controller;

import com.selectool.config.Constant;
import com.selectool.dto.response.ServiceTokenResponse;
import com.selectool.service.OAuthService;
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
@Api(tags = "인증")
public class MemberController {
    private final OAuthService oAuthService;

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
}
