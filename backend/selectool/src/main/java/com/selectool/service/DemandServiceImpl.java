package com.selectool.service;

import com.selectool.dto.corp.filter.CorpFilter;
import com.selectool.dto.corp.request.CorpCreateRequest;
import com.selectool.dto.corp.response.*;
import com.selectool.dto.demand.request.DemandCreateRequest;
import com.selectool.dto.demand.request.DemandUpdateRequest;
import com.selectool.dto.demand.response.DemandResponse;
import com.selectool.dto.tool.request.ToolCreateRequest;
import com.selectool.entity.*;
import com.selectool.exception.DuplicateException;
import com.selectool.exception.NotFoundException;
import com.selectool.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.selectool.exception.DuplicateException.CORP_BOOKMARK_DUPLICATED;
import static com.selectool.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class DemandServiceImpl implements DemandService {
    private final UserRepo userRepo;

    private final DemandRepo demandRepo;

    @Override
    @Transactional
    public void createDemand(Long userId, DemandCreateRequest request) {
        User user;
        if (userId == null || userId == 0L) user = null;
        else user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Demand demand = Demand.builder()
                .user(user)
                .content(request.getContent())
                .type(request.getType())
                .status(false)
                .build();

        demandRepo.save(demand);
    }

    @Override
    @Transactional
    public void updateDemand(Long demandId, DemandUpdateRequest request) {
        Demand demand = demandRepo.findById(demandId)
                .orElseThrow(() -> new NotFoundException(DEMAND_NOT_FOUND));

        demand.update(request.getStatus());
        demandRepo.save(demand);
    }

    @Override
    @Transactional
    public void deleteDemand(Long demandId) {
        Demand demand = demandRepo.findById(demandId)
                .orElseThrow(() -> new NotFoundException(DEMAND_NOT_FOUND));

        demandRepo.delete(demand);
    }

    @Override
    public List<DemandResponse> getDemandList() {
        List<Demand> demands = demandRepo.findAll();

        return demands.stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    private DemandResponse entityToDTO(Demand demand) {
        User user = demand.getUser();
        return DemandResponse.builder()
                .id(demand.getId())
                .userType(user != null ? user.getType() : null)
                .userEmail(user != null ? user.getEmail() : null)
                .createdAt(demand.getCreatedAt())
                .content(demand.getContent())
                .type(demand.getType())
                .status(demand.getStatus())
                .build();
    }
}
