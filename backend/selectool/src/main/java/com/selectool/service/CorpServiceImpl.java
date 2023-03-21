package com.selectool.service;

import com.selectool.dto.corp.request.CorpCreateRequest;
import com.selectool.dto.corp.response.*;
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
public class CorpServiceImpl implements CorpService {
    private final UserRepo userRepo;

    private final CorpRepo corpRepo;

    private final ToolRepo toolRepo;

    private final ClientRepo clientRepo;

    private final CorpCategoryRepo corpCategoryRepo;

    private final CorpBranchRepo corpBranchRepo;

    private final CorpCultureRepo corpCultureRepo;

    private final CorpToolRepo corpToolRepo;

    private final CorpBookmarkRepo corpBookmarkRepo;

    @Override
    @Transactional
    public CorpResponse createCorp(CorpCreateRequest request) {
        // 기업 생성
        Corp corp = Corp.builder()
                .nameKr(request.getNameKr())
                .nameEn(request.getNameEn())
                .info(request.getInfo())
                .teamNameKr(request.getTeamNameKr())
                .teamNameEn(request.getTeamNameEn())
                .image(request.getImage())
                .url(request.getUrl())
                .content(request.getContent())
                .build();


        // 카테고리 생성
        List<CorpCategory> corpCategories = request.getCategories().stream()
                .map(category -> CorpCategory.builder()
                        .name(category.getName())
                        .corp(corp)
                        .build()
                )
                .collect(Collectors.toList());
        corp.setCorpCategories(corpCategories);

        // 자회사 생성
        List<CorpBranch> corpBranches = request.getBranches().stream()
                .map(branch -> CorpBranch.builder()
                        .name(branch.getName())
                        .image(branch.getImage())
                        .corp(corp)
                        .build()
                )
                .collect(Collectors.toList());
        corp.setCorpBranches(corpBranches);

        // 회사 문화 생성
        List<CorpCulture> corpCultures = request.getCultures().stream()
                .map(culture -> CorpCulture.builder()
                        .title(culture.getTitle())
                        .content(culture.getContent())
                        .corp(corp)
                        .build()
                )
                .collect(Collectors.toList());
        corp.setCorpCultures(corpCultures);

        // 회사 사용 툴 등록
        List<CorpTool> corpTools = request.getTools().stream()
                .map(tool -> {
                            Tool t = toolRepo.findById(tool.getId())
                                    .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

                            return CorpTool.builder()
                                    .corp(corp)
                                    .tool(t)
                                    .build();
                        }
                )
                .collect(Collectors.toList());
        corp.setCorpTools(corpTools);

        corpRepo.save(corp);
        return entityToDTO(null, corp);
    }

    @Override
    @Transactional
    public CorpResponse updateCorp(Long corpId, CorpCreateRequest request) {
        Corp corp = corpRepo.findById(corpId)
                .orElseThrow(() -> new NotFoundException(CORP_NOT_FOUND));

        // 카테고리 수정 (삭제 후 생성)
        List<CorpCategory> corpCategories = corp.getCorpCategories();
        corpCategories.clear();
        corpCategories.addAll(
                request.getCategories().stream()
                        .map(category -> CorpCategory.builder()
                                .name(category.getName())
                                .corp(corp)
                                .build()
                        )
                        .collect(Collectors.toList())
        );

        // 자회사 수정 (삭제 후 생성)
        List<CorpBranch> corpBranches = corp.getCorpBranches();
        corpBranches.clear();
        corpBranches.addAll(
                request.getBranches().stream()
                        .map(branch -> CorpBranch.builder()
                                .name(branch.getName())
                                .image(branch.getImage())
                                .corp(corp)
                                .build()
                        )
                        .collect(Collectors.toList())
        );

        // 회사 문화 수정 (삭제 후 생성)
        List<CorpCulture> corpCultures = corp.getCorpCultures();
        corpCultures.clear();
        corpCultures.addAll(
                request.getCultures().stream()
                        .map(culture -> CorpCulture.builder()
                                .title(culture.getTitle())
                                .content(culture.getContent())
                                .corp(corp)
                                .build()
                        )
                        .collect(Collectors.toList())
        );


        // 회사 사용 툴 수정 (삭제 후 생성)
        List<CorpTool> corpTools = corp.getCorpTools();
        corpTools.clear();
        corpTools.addAll(
                request.getTools().stream()
                        .map(tool -> {
                                    Tool t = toolRepo.findById(tool.getId())
                                            .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

                                    return CorpTool.builder()
                                            .corp(corp)
                                            .tool(t)
                                            .build();
                                }
                        )
                        .collect(Collectors.toList())
        );

        corp.update(
                request.getNameKr(),
                request.getNameEn(),
                request.getInfo(),
                request.getTeamNameKr(),
                request.getTeamNameEn(),
                request.getImage(),
                request.getUrl(),
                request.getContent(),
                corpCategories,
                corpBranches,
                corpCultures,
                corpTools
        );

        corpRepo.save(corp);
        return entityToDTO(null, corp);
    }

    @Override
    public List<CorpResponse> getCorpList(Long userId) {
        List<Corp> response = corpRepo.findAll();

        List<CorpBookmark> corpBookmarks = corpBookmarkRepo.findByUserId(userId);
        Map<Corp, Boolean> bookmarkMap = new HashMap<>();

        for (CorpBookmark bookmark : corpBookmarks) {
            bookmarkMap.put(bookmark.getCorp(), true);
        }

        return response.stream()
                .map(corp -> CorpResponse.builder()
                        .id(corp.getId())
                        .nameKr(corp.getNameKr())
                        .nameEn(corp.getNameEn())
                        .info(corp.getInfo())
                        .teamNameKr(corp.getTeamNameKr())
                        .teamNameEn(corp.getTeamNameEn())
                        .image(corp.getImage())
                        .url(corp.getUrl())
                        .content(corp.getContent())
                        .isBookmarked(bookmarkMap.get(corp) != null)
                        .categories(
                                corp.getCorpCategories().stream()
                                        .map(category -> CorpCategoryResponse.builder()
                                                .name(category.getName())
                                                .build())
                                        .collect(Collectors.toList())
                        )
                        .branches(
                                corp.getCorpBranches().stream()
                                        .map(branch -> CorpBranchResponse.builder()
                                                .id(branch.getId())
                                                .name(branch.getName())
                                                .image(branch.getImage())
                                                .build()
                                        )
                                        .collect(Collectors.toList())
                        )
                        .cultures(
                                corp.getCorpCultures().stream()
                                        .map(culture -> CorpCultureResponse.builder()
                                                .id(culture.getId())
                                                .title(culture.getTitle())
                                                .content(culture.getContent())
                                                .build()
                                        )
                                        .collect(Collectors.toList())
                        )
                        .tools(
                                corp.getCorpTools().stream()
                                        .map(corpTool -> {
                                                    Tool tool = corpTool.getTool();
                                                    return CorpToolResponse.builder()
                                                            .id(tool.getId())
                                                            .nameKr(tool.getNameKr())
                                                            .nameEn(tool.getNameEn())
                                                            .image(tool.getImage())
                                                            .url(tool.getUrl())
                                                            .build();
                                                }
                                        )
                                        .collect(Collectors.toList())
                        )
                        .build()
                )
                .collect(Collectors.toList());
    }

    @Override
    public CorpResponse getCorp(Long userId, Long corpId) {
        Corp corp = corpRepo.findById(corpId)
                .orElseThrow(() -> new NotFoundException(CORP_NOT_FOUND));

        return entityToDTO(userId, corp);
    }

    @Override
    @Transactional
    public void deleteCorp(Long corpId) {
        Corp corp = corpRepo.findById(corpId)
                .orElseThrow(() -> new NotFoundException(CORP_NOT_FOUND));

        corpRepo.delete(corp);
    }

    @Override
    @Transactional
    public void addBookmark(Long userId, Long corpId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Corp corp = corpRepo.findById(corpId)
                .orElseThrow(() -> new NotFoundException(CORP_NOT_FOUND));

        // 이미 등록된 북마크 체크
        if (!corpBookmarkRepo.findByCorpAndUserId(corp, userId).isEmpty())
            throw new DuplicateException(CORP_BOOKMARK_DUPLICATED);

        CorpBookmark corpBookmark = CorpBookmark.builder()
                .user(user)
                .corp(corp)
                .build();

        corpBookmarkRepo.save(corpBookmark);
    }

    @Override
    @Transactional
    public void unBookmark(Long userId, Long corpId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Corp corp = corpRepo.findById(corpId)
                .orElseThrow(() -> new NotFoundException(CORP_NOT_FOUND));

        // 등록된 북마크인지 체크
        List<CorpBookmark> bookmarks = corpBookmarkRepo.findByCorpAndUserId(corp, userId);
        if (bookmarks.isEmpty())
            throw new NotFoundException(CORP_BOOKMARK_NOT_FOUND);

        corpBookmarkRepo.deleteAll(bookmarks);
    }

    private CorpResponse entityToDTO(Long userId, Corp corp) {
        List<CorpBookmark> corpBookmarks;
        if (userId != null) {
            corpBookmarks = corpBookmarkRepo.findByCorpAndUserId(corp, userId);
        } else {
            corpBookmarks = new ArrayList<>();
        }

        return CorpResponse.builder()
                .id(corp.getId())
                .nameKr(corp.getNameKr())
                .nameEn(corp.getNameEn())
                .info(corp.getInfo())
                .teamNameKr(corp.getTeamNameKr())
                .teamNameEn(corp.getTeamNameEn())
                .image(corp.getImage())
                .url(corp.getUrl())
                .content(corp.getContent())
                .isBookmarked(!corpBookmarks.isEmpty())
                .categories(
                        corp.getCorpCategories().stream()
                                .map(category -> CorpCategoryResponse.builder()
                                        .name(category.getName())
                                        .build())
                                .collect(Collectors.toList())
                )
                .branches(
                        corp.getCorpBranches().stream()
                                .map(branch -> CorpBranchResponse.builder()
                                        .id(branch.getId())
                                        .name(branch.getName())
                                        .image(branch.getImage())
                                        .build()
                                )
                                .collect(Collectors.toList())
                )
                .cultures(
                        corp.getCorpCultures().stream()
                                .map(culture -> CorpCultureResponse.builder()
                                        .id(culture.getId())
                                        .title(culture.getTitle())
                                        .content(culture.getContent())
                                        .build()
                                )
                                .collect(Collectors.toList())
                )
                .tools(
                        corp.getCorpTools().stream()
                                .map(corpTool -> {
                                            Tool tool = corpTool.getTool();
                                            return CorpToolResponse.builder()
                                                    .id(tool.getId())
                                                    .nameKr(tool.getNameKr())
                                                    .nameEn(tool.getNameEn())
                                                    .image(tool.getImage())
                                                    .url(tool.getUrl())
                                                    .build();
                                        }
                                )
                                .collect(Collectors.toList())
                )
                .build();
    }

    private Tool createTool(ToolCreateRequest request) {
        // 툴 생성
        Tool tool = Tool.builder()
                .nameKr(request.getNameKr())
                .nameEn(request.getNameEn())
                .info(request.getInfo())
                .msg(request.getMsg())
                .country(request.getCountry())
                .topic(request.getTopic())
                .image(request.getImage())
                .url(request.getUrl())
                .aos(request.getAos())
                .ios(request.getIos())
                .build();

        // 툴 카테고리 생성
        List<ToolCategory> toolCategories = request.getCategories().stream()
                .map(category -> ToolCategory.builder()
                        .name(category.getName())
                        .tool(tool)
                        .build()
                )
                .collect(Collectors.toList());
        tool.setToolCategories(toolCategories);

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

        // 툴 주요 고객 생성
        List<ToolClient> toolClients = request.getClients().stream()
                .map(client -> {
                            ToolClient toolClient = ToolClient.builder()
                                    .tool(tool)
                                    .build();

                            Client c = clientRepo.findById(client.getId())
                                    .orElse(
                                            Client.builder()
                                                    .name(client.getName())
                                                    .image(client.getImage())
                                                    .url(client.getUrl())
                                                    .build()
                                    );
                            clientRepo.save(c);
                            toolClient.setClient(c);

                            return toolClient;
                        }
                )
                .collect(Collectors.toList());
        tool.setToolClients(toolClients);

        toolRepo.save(tool);
        return tool;
    }
}
