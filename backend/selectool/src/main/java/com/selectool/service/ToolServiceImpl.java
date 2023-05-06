package com.selectool.service;

import com.selectool.dto.tool.filter.ToolFilter;
import com.selectool.dto.tool.request.ToolCreateRequest;
import com.selectool.dto.tool.request.ToolPlanCreateRequest;
import com.selectool.dto.tool.response.*;
import com.selectool.entity.*;
import com.selectool.exception.DuplicateException;
import com.selectool.exception.NotFoundException;
import com.selectool.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.selectool.exception.DuplicateException.TOOL_BOOKMARK_DUPLICATED;
import static com.selectool.exception.DuplicateException.TOOL_SUBSCRIBE_DUPLICATED;
import static com.selectool.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ToolServiceImpl implements ToolService {
    private final UserRepo userRepo;

    private final ToolRepo toolRepo;

    private final ClientRepo clientRepo;

    private final ToolBookmarkRepo toolBookmarkRepo;

    private final ToolSubscribeRepo toolSubscribeRepo;

    @Override
    public List<ToolListResponse> getToolList(Long userId, ToolFilter filter) {
        List<Tool> response = toolRepo.searchByFilter(filter);

        List<ToolBookmark> toolBookmarks = toolBookmarkRepo.findByUserId(userId);
        Map<Tool, Boolean> bookmarkMap = new HashMap<>();

        for (ToolBookmark bookmark : toolBookmarks) {
            bookmarkMap.put(bookmark.getTool(), true);
        }

        return response.stream()
                .map(tool -> entityToListDTO(tool, bookmarkMap))
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
                .country(request.getCountry())
                .topic(request.getTopic())
                .image(request.getImage())
                .url(request.getUrl())
                .aos(request.getAos())
                .ios(request.getIos())
                .trial(request.getTrial())
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

                            Long clientId = client.getId();
                            Client c;
                            if (clientId == 0L) {
                                c = Client.builder()
                                        .name(client.getName())
                                        .image(client.getImage())
                                        .url(client.getUrl())
                                        .build();
                                clientRepo.save(c);
                            } else {
                                c = clientRepo.findById(client.getId())
                                        .orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND));
                            }

                            return ToolClient.builder()
                                    .tool(tool)
                                    .client(c)
                                    .build();
                        }
                )
                .collect(Collectors.toList());
        tool.setToolClients(toolClients);

        toolRepo.save(tool);
        return entityToDTO(null, tool);
    }

    @Override
    @Transactional
    public List<ToolResponse> bulkCreateTool(List<ToolCreateRequest> request) {
        List<ToolResponse> toolResponses = new ArrayList<>();

        request.forEach(toolCreateRequest -> {
            ToolResponse toolResponse = createTool(toolCreateRequest);
            toolResponses.add(toolResponse);
        });

        return toolResponses;
    }

    @Override
    @Transactional
    public ToolResponse updateTool(Long toolId, ToolCreateRequest request) {
        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        // 툴 카테고리 삭제 후 생성
        List<ToolCategory> toolCategories = tool.getToolCategories();
        toolCategories.clear();
        toolCategories.addAll(request.getCategories().stream()
                .map(category -> ToolCategory.builder()
                        .name(category.getName())
                        .tool(tool)
                        .build()
                )
                .collect(Collectors.toList())
        );

        // 툴 플랜 삭제 후 생성
        List<ToolPlan> toolPlans = tool.getToolPlans();
        toolPlans.clear();
        toolPlans.addAll(
                request.getPlans().stream()
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
                        .collect(Collectors.toList())
        );

        // 툴 기능 삭제 후 생성
        List<ToolFunction> toolFunctions = tool.getToolFunctions();
        toolFunctions.clear();
        toolFunctions.addAll(
                request.getToolFunctions().stream()
                        .map(toolFunction -> ToolFunction.builder()
                                .name(toolFunction.getName())
                                .content(toolFunction.getContent())
                                .tool(tool)
                                .build()
                        )
                        .collect(Collectors.toList())
        );

        // 툴 주요 고객 삭제 후 생성
        List<ToolClient> toolClients = tool.getToolClients();
        toolClients.clear();
        toolClients.addAll(
                request.getClients().stream()
                        .map(client -> {

                                    Long clientId = client.getId();
                                    Client c;
                                    if (clientId == 0L) {
                                        c = Client.builder()
                                                .name(client.getName())
                                                .image(client.getImage())
                                                .url(client.getUrl())
                                                .build();
                                        clientRepo.save(c);
                                    } else {
                                        c = clientRepo.findById(client.getId())
                                                .orElseThrow(() -> new NotFoundException(CLIENT_NOT_FOUND));
                                        c.update(
                                                client.getName(),
                                                client.getImage(),
                                                client.getUrl()
                                        );
                                    }

                                    return ToolClient.builder()
                                            .tool(tool)
                                            .client(c)
                                            .build();
                                }
                        )
                        .collect(Collectors.toList())
        );

        tool.update(
                request.getNameKr(),
                request.getNameEn(),
                request.getInfo(),
                request.getMsg(),
                request.getTopic(),
                request.getCountry(),
                request.getImage(),
                request.getUrl(),
                request.getAos(),
                request.getIos(),
                request.getTrial(),
                toolCategories,
                toolPlans,
                toolFunctions,
                toolClients
        );

        toolRepo.save(tool);
        return entityToDTO(null, tool);
    }

    @Override
    @Transactional
    public void deleteTool(Long toolId) {
        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        toolRepo.delete(tool);
    }

    @Override
    @Transactional
    public void addBookmark(Long userId, Long toolId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        // 이미 등록된 북마크 체크
        if (!toolBookmarkRepo.findByToolAndUserId(tool, userId).isEmpty())
            throw new DuplicateException(TOOL_BOOKMARK_DUPLICATED);

        ToolBookmark toolBookmark = ToolBookmark.builder()
                .user(user)
                .tool(tool)
                .build();

        toolBookmarkRepo.save(toolBookmark);
    }

    @Override
    @Transactional
    public void unBookmark(Long userId, Long toolId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        // 등록된 북마크인지 체크
        List<ToolBookmark> bookmarks = toolBookmarkRepo.findByToolAndUserId(tool, userId);
        if (bookmarks.isEmpty())
            throw new NotFoundException(TOOL_BOOKMARK_NOT_FOUND);

        toolBookmarkRepo.deleteAll(bookmarks);
    }

    @Override
    @Transactional
    public void addSubscribe(Long userId, Long toolId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        // 이미 등록된 구독 체크
        if (!toolSubscribeRepo.findByToolAndUserId(tool, userId).isEmpty())
            throw new DuplicateException(TOOL_SUBSCRIBE_DUPLICATED);

        ToolSubscribe toolSubscribe = ToolSubscribe.builder()
                .user(user)
                .tool(tool)
                .build();

        toolSubscribeRepo.save(toolSubscribe);
    }

    @Override
    @Transactional
    public void unSubscribe(Long userId, Long toolId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Tool tool = toolRepo.findById(toolId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_FOUND));

        // 등록된 구독인지 체크
        List<ToolSubscribe> subscribes = toolSubscribeRepo.findByToolAndUserId(tool, userId);
        if (subscribes.isEmpty())
            throw new NotFoundException(TOOL_SUBSCRIBE_DUPLICATED);

        toolSubscribeRepo.deleteAll(subscribes);
    }

    @Override
    public List<ToolListResponse> getSubscribeToolList(Long userId) {
        List<ToolSubscribe> subscribes = toolSubscribeRepo.findByUserId(userId);

        List<ToolBookmark> toolBookmarks = toolBookmarkRepo.findByUserId(userId);
        Map<Tool, Boolean> bookmarkMap = new HashMap<>();

        for (ToolBookmark bookmark : toolBookmarks) {
            bookmarkMap.put(bookmark.getTool(), true);
        }

        return subscribes.stream()
                .map(subscribe -> {
                    Tool tool = subscribe.getTool();
                    return entityToListDTO(tool, bookmarkMap);
                })
                .collect(Collectors.toList());
    }

    private ToolResponse entityToDTO(Long userId, Tool tool) {
        List<ToolBookmark> toolBookmarks;
        List<ToolSubscribe> toolSubscribes;
        if (userId != null) {
            toolBookmarks = toolBookmarkRepo.findByToolAndUserId(tool, userId);
            toolSubscribes = toolSubscribeRepo.findByToolAndUserId(tool, userId);
        } else {
            toolBookmarks = new ArrayList<>();
            toolSubscribes = new ArrayList<>();
        }

        return ToolResponse.builder()
                .id(tool.getId())
                .nameKr(tool.getNameKr())
                .nameEn(tool.getNameEn())
                .info(tool.getInfo())
                .msg(tool.getMsg())
                .topic(tool.getTopic())
                .country(tool.getCountry())
                .image(tool.getImage())
                .url(tool.getUrl())
                .aos(tool.getAos())
                .ios(tool.getIos())
                .trial(tool.getTrial())
                .isBookmarked(!toolBookmarks.isEmpty())
                .isSubscribed(!toolSubscribes.isEmpty())
                .categories(tool.getToolCategories().stream()
                        .map(category -> ToolCategoryResponse.builder()
                                .name(category.getName())
                                .build())
                        .collect(Collectors.toList())
                )
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

    @Override
    public List<ToolSubscribeUserResponse> getSubscribeUserList() {
        List<ToolSubscribe> toolSubscribes = toolSubscribeRepo.findAll();

        Map<User, ToolSubscribeUserResponse> userMap = new HashMap<>();

        List<ToolSubscribeUserResponse> responses = new ArrayList<>();

        for (ToolSubscribe toolSubscribe: toolSubscribes) {
            User user = toolSubscribe.getUser();
            Tool tool = toolSubscribe.getTool();
            if (userMap.get(user) == null) {
                List<ToolSimpleResponse> tools = new ArrayList<>();
                tools.add(new ToolSimpleResponse(tool.getId(), tool.getNameKr(), tool.getNameEn()));

                ToolSubscribeUserResponse response = ToolSubscribeUserResponse.builder()
                        .id(user.getId())
                        .type(user.getType())
                        .email(user.getEmail())
                        .subscribeEmail(user.getSubscribeEmail())
                        .subscribeActive(user.getSubscribeActive())
                        .emailVerified(user.getEmailVerified())
                        .createdAt(toolSubscribe.getCreatedAt())
                        .tools(tools)
                        .build();

                userMap.put(user, response);
                responses.add(response);
            }
            else {
                ToolSubscribeUserResponse response = userMap.get(user);
                response.getTools().add(new ToolSimpleResponse(tool.getId(), tool.getNameKr(), tool.getNameEn()));
                response.updateMinCreatedAt(toolSubscribe.getCreatedAt());
            }
        }

        return responses;
    }

    private ToolListResponse entityToListDTO(Tool tool, Map<Tool, Boolean> bookmarkMap) {
        return ToolListResponse.builder()
                .id(tool.getId())
                .nameKr(tool.getNameKr())
                .nameEn(tool.getNameEn())
                .info(tool.getInfo())
                .msg(tool.getMsg())
                .topic(tool.getTopic())
                .country(tool.getCountry())
                .image(tool.getImage())
                .url(tool.getUrl())
                .trial(tool.getTrial())
                .isBookmarked(bookmarkMap.get(tool) != null)
                .categories(tool.getToolCategories().stream()
                        .map(category -> ToolCategoryResponse.builder()
                                .name(category.getName())
                                .build())
                        .collect(Collectors.toList())
                )
                .build();
    }
}
