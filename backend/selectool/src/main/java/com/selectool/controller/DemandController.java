package com.selectool.controller;

import com.selectool.config.JwtUtil;
import com.selectool.config.login.Admin;
import com.selectool.config.login.LoginAdmin;
import com.selectool.dto.demand.request.DemandCreateRequest;
import com.selectool.dto.demand.request.DemandUpdateRequest;
import com.selectool.dto.demand.response.DemandResponse;
import com.selectool.service.DemandService;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/request")
@Api(tags = "요청 사항")
public class DemandController {
    private final DemandService demandService;

    private final JwtUtil jwtUtil;

    @PostMapping("/demands")
    @ApiOperation(value = "요청 사항 추가")
    public ResponseEntity<?> createDemand(
            @RequestHeader HttpHeaders headers,
            @RequestBody DemandCreateRequest request
    ) {
        List<String> auths = headers.get(HttpHeaders.AUTHORIZATION);
        Long userId;
        if (auths == null) {
            userId = null;
        } else {
            String jwt = auths.get(0).replace("Bearer%20", "").replace("Bearer ", "");
            Claims body = jwtUtil.getClaimsFormToken(jwt);
            userId = Long.valueOf(String.valueOf(body.get("id")));
        }
        demandService.createDemand(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/demands/{demandId}")
    @ApiOperation(value = "요청 사항 상태 수정")
    public ResponseEntity<?> completeDemand(
            @LoginAdmin Admin admin,
            @PathVariable Long demandId,
            @RequestBody DemandUpdateRequest request
            ) {
        demandService.updateDemand(demandId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/demands/{demandId}")
    @ApiOperation(value = "요청 사항 삭제")
    public ResponseEntity<?> deleteDemand(
            @LoginAdmin Admin admin,
            @PathVariable Long demandId
    ) {
        demandService.deleteDemand(demandId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/demands")
    @ApiOperation(value = "요청 사항 목록 조회")
    public ResponseEntity<List<DemandResponse>> getDemandList(
//            @LoginAdmin Admin admin
    ) {
        List<DemandResponse> response = demandService.getDemandList();
        return ResponseEntity.ok(response);
    }
}
