package com.selectool.service;

import com.selectool.dto.demand.request.DemandCreateRequest;
import com.selectool.dto.demand.request.DemandUpdateRequest;
import com.selectool.dto.demand.response.DemandResponse;

import java.util.List;

public interface DemandService {
    // 요청 사항 추가
    public void createDemand(Long userId, DemandCreateRequest request);
    // 요청 사항 완료 처리
    public void updateDemand(Long demandId, DemandUpdateRequest request);
    // 요청 사항 삭제
    public void deleteDemand(Long demandId);
    // 요청 사항 목록 조회
    public List<DemandResponse> getDemandList();
}
