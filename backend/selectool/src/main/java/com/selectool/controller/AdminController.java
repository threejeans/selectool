package com.selectool.controller;

import com.selectool.config.loginuser.LoginUser;
import com.selectool.config.loginuser.User;
import com.selectool.dto.request.CodeRequest;
import com.selectool.entity.Code;
import com.selectool.service.AdminService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@Api(tags = "관리자")
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/login")
    @ApiOperation(value = "관리자 이메일로 로그인 코드 전송")
    public ResponseEntity<?> sendAdminCode(@RequestBody CodeRequest request) throws Exception {
        adminService.sendCode(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/auth")
    @ApiOperation(value = "관리자 코드로 로그인")
    public ResponseEntity<?> loginAdmin(@RequestBody CodeRequest request) {
        adminService.login(request);
        return ResponseEntity.ok().build();
    }
}
