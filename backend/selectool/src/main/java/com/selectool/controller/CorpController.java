package com.selectool.controller;

import com.selectool.config.login.Admin;
import com.selectool.config.login.LoginAdmin;
import com.selectool.config.login.LoginUser;
import com.selectool.config.login.User;
import com.selectool.dto.corp.request.CorpCreateRequest;
import com.selectool.dto.corp.request.CorpUpdateRequest;
import com.selectool.dto.corp.response.CorpResponse;
import com.selectool.service.CorpService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/with")
@Api(tags = "함께 써요")
public class CorpController {
    private final CorpService corpService;

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
            @LoginUser User user
    ) {
        List<CorpResponse> response = corpService.getCorpList(user.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/corps/{corpId}")
    @ApiOperation(value = "기업 단건 조회")
    public ResponseEntity<CorpResponse> getCorp(
            @LoginUser User user,
            @PathVariable Long corpId
    ) {
        CorpResponse response = corpService.getCorp(user.getId(), corpId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/corps/{corpId}")
    @ApiOperation(value = "기업 수정")
    public ResponseEntity<CorpResponse> updateCorp(
            @LoginAdmin Admin admin,
            @PathVariable Long corpId,
            @RequestBody CorpUpdateRequest request
    ) {
        CorpResponse response = corpService.updateCorp(corpId, request);
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

    /* 비 로그인 유저 조회 */
    @GetMapping("nomember/corps")
    @ApiOperation(value = "비 로그인 기업 목록 조회", tags = "비 로그인 조회")
    public ResponseEntity<List<CorpResponse>> getNoMemberCorpList(
    ) {
        List<CorpResponse> response = corpService.getCorpList(0L);
        return ResponseEntity.ok(response);
    }

    @GetMapping("nomember/corps/{corpId}")
    @ApiOperation(value = "비 로그인 기업 단건 조회", tags = "비 로그인 조회")
    public ResponseEntity<CorpResponse> getNoMemberCorp(
            @PathVariable Long corpId
    ) {
        CorpResponse response = corpService.getCorp(0L, corpId);
        return ResponseEntity.ok(response);
    }
}
