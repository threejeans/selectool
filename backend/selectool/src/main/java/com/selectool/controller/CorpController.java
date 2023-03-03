package com.selectool.controller;

import com.selectool.config.JwtUtil;
import com.selectool.config.login.Admin;
import com.selectool.config.login.LoginAdmin;
import com.selectool.config.login.LoginUser;
import com.selectool.config.login.User;
import com.selectool.dto.corp.request.CorpCreateRequest;
import com.selectool.dto.corp.response.CorpResponse;
import com.selectool.service.CorpService;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.headers.Header;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/with")
@Api(tags = "함께 써요")
public class CorpController {
    private final CorpService corpService;

    private final JwtUtil jwtUtil;

    @PostMapping("/corps")
    @ApiOperation(value = "기업 추가")
    public ResponseEntity<CorpResponse> createCorp(
            @LoginAdmin Admin admin,
            @RequestBody CorpCreateRequest request
    ) {
        CorpResponse response = corpService.createCorp(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/corps")
    @ApiOperation(value = "기업 목록 조회")
    public ResponseEntity<List<CorpResponse>> getCorpList(
            HttpServletRequest request
    ) {
        Long userId = null;
        try{
            userId = jwtUtil.getUserIdByHeader(request);
        } catch (Exception e) {
            userId = 0L;
        }

        List<CorpResponse> response = corpService.getCorpList(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/corps/{corpId}")
    @ApiOperation(value = "기업 단건 조회")
    public ResponseEntity<CorpResponse> getCorp(
            HttpServletRequest request,
            @PathVariable Long corpId
    ) {
        Long userId = null;
        try{
            userId = jwtUtil.getUserIdByHeader(request);
        } catch (Exception e) {
            userId = 0L;
        }

        CorpResponse response = corpService.getCorp(userId, corpId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/corps/{corpId}")
    @ApiOperation(value = "기업 삭제")
    public ResponseEntity<?> deleteCorp(
            @LoginAdmin Admin admin,
            @PathVariable Long corpId
    ) {
        corpService.deleteCorp(corpId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/corps/{corpId}/bookmarks")
    @ApiOperation(value = "기업 북마크 추가")
    public ResponseEntity<?> addBookmarkGuide(
            @LoginUser User user,
            @PathVariable Long corpId
    ) {
        corpService.addBookmark(user.getId(), corpId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/corps/{corpId}/bookmarks")
    @ApiOperation(value = "기업 북마크 해제")
    public ResponseEntity<?> unBookmarkGuide(
            @LoginUser User user,
            @PathVariable Long corpId
    ) {
        corpService.unBookmark(user.getId(), corpId);
        return ResponseEntity.ok().build();
    }
}
