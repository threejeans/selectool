package com.selectool.controller;

import com.selectool.config.login.Admin;
import com.selectool.config.login.LoginAdmin;
import com.selectool.config.login.LoginUser;
import com.selectool.config.login.User;
import com.selectool.dto.guide.request.GuideCreateRequest;
import com.selectool.dto.guide.response.GuideResponse;
import com.selectool.service.GuideService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
@Api(tags = "가이드")
public class GuideController {
    private final GuideService guideService;

    @GetMapping("/guides")
    @ApiOperation(value = "가이드 목록 조회")
    public ResponseEntity<List<GuideResponse>> getGuideList(
            @LoginUser User user
    ) {
        List<GuideResponse> response = guideService.getGuideList(user.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/guides/{guideId}")
    @ApiOperation(value = "가이드 단건 조회")
    public ResponseEntity<GuideResponse> getGuide(
            @LoginUser User user,
            @PathVariable Long guideId
    ) {
        GuideResponse response = guideService.getGuide(user.getId(), guideId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/guides")
    @ApiOperation(value = "가이드 생성")
    public ResponseEntity<?> createGuide(
            @LoginAdmin Admin admin,
            @RequestBody GuideCreateRequest request
    ) {
        GuideResponse response = guideService.createGuide(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/guides/{guideId}")
    @ApiOperation(value = "가이드 수정")
    public ResponseEntity<?> updateGuide(
            @LoginAdmin Admin admin,
            @PathVariable Long guideId,
            @RequestBody GuideCreateRequest request
    ) {
        GuideResponse response = guideService.updateGuide(guideId, request);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/guides/{guideId}")
    @ApiOperation(value = "가이드 삭제")
    public ResponseEntity<?> deleteGuide(
            @LoginAdmin Admin admin,
            @PathVariable Long guideId
    ) {
        guideService.deleteGuide(guideId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/guides/{guideId}/bookmarks")
    @ApiOperation(value = "가이드 북마크 추가")
    public ResponseEntity<?> addBookmarkGuide(
            @LoginUser User user,
            @PathVariable Long guideId
    ) {
        guideService.addBookmark(user.getId(), guideId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/guides/{guideId}/bookmarks")
    @ApiOperation(value = "가이드 북마크 해제")
    public ResponseEntity<?> unBookmarkGuide(
            @LoginUser User user,
            @PathVariable Long guideId
    ) {
        guideService.unBookmark(user.getId(), guideId);
        return ResponseEntity.ok().build();
    }

    /* 비로그인 유저 조회 */
    @GetMapping("nomember/guides")
    @ApiOperation(value = "비 로그인 가이드 목록 조회", tags = "비 로그인 조회")
    public ResponseEntity<List<GuideResponse>> getNoMemberGuideList(
    ) {
        List<GuideResponse> response = guideService.getGuideList(0L);
        return ResponseEntity.ok(response);
    }

    @GetMapping("nomember/guides/{guideId}")
    @ApiOperation(value = "비 로그인 가이드 단건 조회", tags = "비 로그인 조회")
    public ResponseEntity<GuideResponse> getNoMemberGuide(
            @PathVariable Long guideId
    ) {
        GuideResponse response = guideService.getGuide(0L, guideId);
        return ResponseEntity.ok(response);
    }
}
