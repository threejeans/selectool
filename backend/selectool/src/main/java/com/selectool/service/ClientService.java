package com.selectool.service;

import com.selectool.dto.tool.request.ClientCreateRequest;
import com.selectool.dto.tool.response.ClientResponse;

import java.util.List;

public interface ClientService {
    // 주요 고객 목록 조회
    public List<ClientResponse> getClientList(String name);
    // 주요 고객 단건 조회
    public ClientResponse getClient(Long clientId);
    // 주요 고객 등록
    public ClientResponse createClient(ClientCreateRequest request);
    // 주요 고객 삭제
    public void deleteClient(Long clientId);
    //TODO
    // 툴 수정
//    public ClientResponse updateClient(ClientUpdateRequest request);
}
