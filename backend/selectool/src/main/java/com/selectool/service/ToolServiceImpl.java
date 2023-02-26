package com.selectool.service;

import com.selectool.dto.tool.request.ToolCreateRequest;
import com.selectool.dto.tool.request.ToolPlanCreateRequest;
import com.selectool.dto.tool.response.*;
import com.selectool.entity.*;
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

import static com.selectool.exception.NotFoundException.TOOL_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ToolServiceImpl implements ToolService {
    private final ToolRepo toolRepo;

    private final ToolPlanRepo toolPlanRepo;

    private final ToolPlanFunctionRepo toolPlanFunctionRepo;

    private final ClientRepo clientRepo;

    private final ToolClientRepo toolClientRepo;

    private final ToolBookmarkRepo toolBookmarkRepo;

    private final CorpToolRepo corpToolRepo;

    @Override
    public List<ToolListResponse> getToolList(Long userId) {
        List<Tool> response = toolRepo.findAll();

        List<ToolBookmark> toolBookmarks = toolBookmarkRepo.findByUserId(userId);
        Map<Tool, Boolean> bookmarkMap = new HashMap<>();

        for (ToolBookmark bookmark : toolBookmarks) {
            bookmarkMap.put(bookmark.getTool(), true);
        }

        return response.stream()
                .map(tool -> ToolListResponse.builder()
                        .id(tool.getId())
                        .nameKr(tool.getNameKr())
                        .nameEn(tool.getNameEn())
                        .info(tool.getInfo())
                        .msg(tool.getMsg())
                        .category(tool.getCategory())
                        .country(tool.getCountry())
                        .image(tool.getImage())
                        .isBookmarked(bookmarkMap.get(tool) != null)
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public ToolResponse getTool(Long userId, Long toolId) {
        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        return entityToDTO(userId, tool);
    }

    @Override
    @Transactional
    public ToolResponse createTool(ToolCreateRequest request) {
        // 툴 생성
        Tool tool = Tool.builder()
                .nameKr(request.getNameKr())
                .nameEn(request.getNameEn())
                .info(request.getInfo())
                .msg(request.getMsg())
                .topic(request.getTopic())
                .category(request.getCategory())
                .image(request.getImage())
                .url(request.getUrl())
                .aos(request.getAos())
                .ios(request.getIos())
                .build();

        // 툴 플랜 생성
        List<ToolPlan> toolPlans = request.getPlans().stream()
                .map(plan -> {
                            ToolPlan toolPlan = ToolPlan.builder()
                                    .title(plan.getTitle())
                                    .volume(plan.getVolume())
                                    .cost(plan.getCost())
                                    .tool(tool)
                                    .build();

                            List<ToolPlanFunction> toolPlanFunctions = plan.getPlanFunctions().stream()
                                    .map(planFunc -> ToolPlanFunction.builder()
                                            .func(planFunc.getFunc())
                                            .toolPlan(toolPlan)
                                            .build()
                                    )
                                    .collect(Collectors.toList());

                            toolPlan.setToolPlanFunctions(toolPlanFunctions);

                            return toolPlan;
                        }
                )
                .collect(Collectors.toList());

        tool.setToolPlans(toolPlans);

        // 툴 기능 생성
        List<ToolFunction> toolFunctions = request.getToolFunctions().stream()
                .map(toolFunction -> ToolFunction.builder()
                        .name(toolFunction.getName())
                        .content(toolFunction.getContent())
                        .tool(tool)
                        .build()
                )
                .collect(Collectors.toList());

        tool.setToolFunctions(toolFunctions);

        //TODO: 툴 주요 고객 생성


        toolRepo.save(tool);
        return entityToDTO(null, tool);
    }

    public ToolResponse entityToDTO(Long userId, Tool tool) {
        List<ToolBookmark> toolBookmarks;
        if (userId != null) {
            toolBookmarks = toolBookmarkRepo.findByToolAndUserId(tool, userId);
        } else {
            toolBookmarks = new ArrayList<>();
        }

        return ToolResponse.builder()
                .id(tool.getId())
                .nameKr(tool.getNameKr())
                .nameEn(tool.getNameEn())
                .info(tool.getInfo())
                .msg(tool.getMsg())
                .category(tool.getCategory())
                .country(tool.getCountry())
                .image(tool.getImage())
                .url(tool.getUrl())
                .aos(tool.getAos())
                .ios(tool.getIos())
                .isBookmarked(!toolBookmarks.isEmpty())
                .toolFunctions(
                        tool.getToolFunctions().stream()
                                .map(toolFunction ->
                                        ToolFunctionResponse.builder()
                                                .id(toolFunction.getId())
                                                .name(toolFunction.getName())
                                                .content(toolFunction.getContent())
                                                .build()
                                )
                                .collect(Collectors.toList())
                )
                .clients(
                        tool.getToolClients().stream()
                                .map(toolClient -> {
                                            Client client = toolClient.getClient();
                                            return ClientResponse.builder()
                                                    .id(client.getId())
                                                    .name(client.getName())
                                                    .image(client.getImage())
                                                    .url(client.getUrl())
                                                    .build();
                                        }
                                )
                                .collect(Collectors.toList())

                )
                .plans(
                        tool.getToolPlans().stream()
                                .map(toolPlan -> ToolPlanResponse.builder()
                                        .id(toolPlan.getId())
                                        .title(toolPlan.getTitle())
                                        .volume(toolPlan.getVolume())
                                        .cost(toolPlan.getCost())
                                        .planFunctions(
                                                toolPlan.getToolPlanFunctions().stream()
                                                        .map(planFunction -> ToolPlanFunctionResponse.builder()
                                                                .id(planFunction.getId())
                                                                .func(planFunction.getFunc())
                                                                .build()
                                                        )
                                                        .collect(Collectors.toList())
                                        )
                                        .build()
                                )
                                .collect(Collectors.toList())
                )
                .build();
    }
}
