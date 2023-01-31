package com.selectool.service;

import com.selectool.dto.request.ToolCreateRequest;
import com.selectool.dto.request.ToolUpdateRequest;
import com.selectool.dto.response.TTagResponse;
import com.selectool.dto.response.ToolResponse;
import com.selectool.entity.TTag;
import com.selectool.entity.Tool;
import com.selectool.entity.ToolTTag;
import com.selectool.exception.NotFoundException;
import com.selectool.repository.TTagRepo;
import com.selectool.repository.ToolRepo;
import com.selectool.repository.ToolTTagRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.selectool.exception.NotFoundException.TOOL_NOT_FOUND;
import static com.selectool.exception.NotFoundException.TOOL_TAG_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ToolServiceImpl implements ToolService {
    private final ToolRepo toolRepo;

    private final TTagRepo tTagRepo;

    private final ToolTTagRepo toolTTagRepo;

    @Override
    @Transactional
    public void createTool(ToolCreateRequest request) {
        // 툴 추가
        Tool tool = Tool.builder()
                .name_kr(request.getName_kr())
                .name_en(request.getName_en())
                .info(request.getInfo())
                .msg(request.getMsg())
                .country(request.getCountry())
                .url(request.getUrl())
                .image(request.getImage())
                .build();

        toolRepo.save(tool);

        // 툴 분류 등록
        TTag tTag = tTagRepo.findById(request.getTTagId())
                        .orElseThrow(() -> new NotFoundException(TOOL_TAG_NOT_FOUND));

        ToolTTag toolTTag = ToolTTag.builder()
                .tTag(tTag)
                .tool(tool)
                .build();

        toolTTagRepo.save(toolTTag);
    }

    @Override
    public List<TTagResponse> getTTagList() {
        List<TTag> responses = tTagRepo.findAll();
        return responses.stream()
                .map(tTag -> TTagResponse.builder()
                        .id(tTag.getId())
                        .name(tTag.getName())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<ToolResponse> getToolList() {
        List<Tool> responses = toolRepo.findAll();
        return responses.stream()
                .map(tool -> ToolResponse.builder()
                        .id(tool.getId())
                        .name_kr(tool.getName_kr())
                        .name_en(tool.getName_en())
                        .info(tool.getInfo())
                        .msg(tool.getMsg())
                        .country(tool.getCountry())
                        .url(tool.getUrl())
                        .image(tool.getImage())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public ToolResponse getTool(Long toolId) {
        return null;
    }

    @Override
    @Transactional
    public void updateTool(ToolUpdateRequest request) {
        Tool tool = toolRepo.findById(request.getId())
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        tool.update(
                request.getName_kr(),
                request.getName_en(),
                request.getInfo(),
                request.getMsg(),
                request.getCountry(),
                request.getUrl(),
                request.getImage()
        );
    }

    @Override
    @Transactional
    public void deleteTool(Long toolId) {
        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        toolRepo.delete(tool);
    }
}
