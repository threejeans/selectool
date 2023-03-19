package com.selectool.service;

import com.selectool.dto.corp.request.CorpCreateRequest;
import com.selectool.dto.corp.request.CorpUpdateRequest;
import com.selectool.dto.corp.response.CorpResponse;

import java.util.List;

public interface CorpService {
    // 기업 추가
    public CorpResponse createCorp(CorpCreateRequest request);
    // 기업 수정
    public CorpResponse updateCorp(Long corpId, CorpUpdateRequest request);
    // 기업 목록 조회
    public List<CorpResponse> getCorpList(Long userId);
    // 기업 단건 조회
    public CorpResponse getCorp(Long userId, Long corpId);
    // 기업 삭제
    public void deleteCorp(Long corpId);
    // 기업 북마크 추가
    public void addBookmark(Long userId, Long corpId);
    // 기업 북마크 해제
    public void unBookmark(Long userId, Long corpId);
    // 기업 정보 수정
}
