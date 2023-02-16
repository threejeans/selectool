package com.selectool.controller;

import com.selectool.dto.request.CodeRequest;
import com.selectool.dto.response.ServiceTokenResponse;
import com.selectool.service.AdminService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Api(tags = "관리자")
public class AdminController {
    private final AdminService adminService;

    @Value("${token.refresh_token.expiration_time}")
    private Long REFRESH_EXPIRATION;

    @PostMapping("/login")
    @ApiOperation(value = "관리자 이메일로 로그인 코드 전송")
    public ResponseEntity<?> sendAdminCode(@RequestBody CodeRequest request) throws Exception {
        adminService.sendCode(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth")
    @ApiOperation(value = "관리자 코드로 로그인")
    public ResponseEntity<?> loginAdmin(@RequestBody CodeRequest request, HttpServletResponse response) {
        ServiceTokenResponse tokenResponse = adminService.login(request);
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
