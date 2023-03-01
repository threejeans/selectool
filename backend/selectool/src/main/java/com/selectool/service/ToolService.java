package com.selectool.service;

import com.selectool.dto.tool.request.ToolCreateRequest;
import com.selectool.dto.tool.response.ToolListResponse;
import com.selectool.dto.tool.response.ToolResponse;

import java.util.List;

public interface ToolService {
    // 툴 목록 조회
    public List<ToolListResponse> getToolList(Long userId);
    // 툴 단건 상세 조회
    public ToolResponse getTool(Long userId, Long toolId);
    // 툴 등록
    public ToolResponse createTool(ToolCreateRequest request);
    // 툴 삭제
    public void deleteTool(Long toolId);
    // 툴 북마크 추가
    public void addBookmark(Long userId, Long toolId);
    // 툴 북마크 해제
    public void unBookmark(Long userId, Long toolId);
    //TODO
    // 툴 수정
}
