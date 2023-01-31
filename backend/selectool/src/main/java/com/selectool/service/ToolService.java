package com.selectool.service;


import com.selectool.dto.request.ToolCreateRequest;
import com.selectool.dto.request.ToolUpdateRequest;
import com.selectool.dto.response.TTagResponse;
import com.selectool.dto.response.ToolResponse;

import java.util.List;

public interface ToolService {
    // 툴 등록
    public void createTool(ToolCreateRequest request);

    // 툴 분류 조회
    public List<TTagResponse> getTTagList();

    // 툴 목록 조회
    public List<ToolResponse> getToolList();

    // 툴 상세 조회
    public ToolResponse getTool(Long toolId);

    // 툴 수정
    public void updateTool(ToolUpdateRequest request);

    // 툴 삭제
    public void deleteTool(Long toolId);
}
