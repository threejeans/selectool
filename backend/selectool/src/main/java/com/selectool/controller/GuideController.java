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
//            @LoginUser User user,
    ) {
        List<GuideResponse> response = guideService.getGuideList(0L);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/guides/{guideId}")
    @ApiOperation(value = "가이드 단건 조회")
    public ResponseEntity<GuideResponse> getGuide(
//            @LoginUser User user,
            @PathVariable Long guideId
    ) {
        GuideResponse response = guideService.getGuide(0L, guideId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/guides")
    @ApiOperation(value = "가이드 생성")
    public ResponseEntity<?> createGuide(
            @LoginAdmin Admin admin,
            GuideCreateRequest request
    ) {
        GuideResponse response = guideService.createGuide(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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
}
