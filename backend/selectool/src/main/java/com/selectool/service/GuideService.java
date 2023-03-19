package com.selectool.service;

import com.selectool.dto.guide.request.GuideCreateRequest;
import com.selectool.dto.guide.response.GuideResponse;

import java.util.List;

public interface GuideService {
    // 가이드 추가
    public GuideResponse createGuide(GuideCreateRequest request);
    // 가이드 목록 조회
    public List<GuideResponse> getGuideList(Long userId);
    // 가이드 단건 조회
    public GuideResponse getGuide(Long userId, Long guideId);
    // 가이드 수정
    public GuideResponse updateGuide(Long guideId, GuideCreateRequest request);
    // 가이드 삭제
    public void deleteGuide(Long guideId);
    // 가이드 북마크 추가
    public void addBookmark(Long userId, Long guideId);
    // 가이드 북마크 해제
    public void unBookmark(Long userId, Long guideId);
}
