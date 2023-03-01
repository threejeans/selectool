package com.selectool.service;

import com.selectool.dto.guide.request.GuideCreateRequest;
import com.selectool.dto.guide.response.GuideCategoryResponse;
import com.selectool.dto.guide.response.GuideResponse;
import com.selectool.entity.Guide;
import com.selectool.entity.GuideBookmark;
import com.selectool.entity.GuideCategory;
import com.selectool.entity.User;
import com.selectool.exception.DuplicateException;
import com.selectool.exception.NotFoundException;
import com.selectool.repository.GuideBookmarkRepo;
import com.selectool.repository.GuideRepo;
import com.selectool.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.selectool.exception.DuplicateException.GUIDE_BOOKMARK_DUPLICATED;
import static com.selectool.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class GuideServiceImpl implements GuideService {
    private final UserRepo userRepo;

    private final GuideRepo guideRepo;

    private final GuideBookmarkRepo guideBookmarkRepo;

    @Override
    @Transactional
    public GuideResponse createGuide(GuideCreateRequest request) {
        Guide guide = Guide.builder()
                .title(request.getTitle())
                .date(request.getDate())
                .content(request.getContent())
                .source(request.getSource())
                .toolName(request.getToolName())
                .func(request.getFunc())
                .url(request.getUrl())
                .image(request.getImage())
                .toolImage(request.getToolImage())
                .build();

        List<GuideCategory> categories = request.getCategories().stream()
                .map(category -> GuideCategory.builder()
                        .name(category.getName())
                        .guide(guide)
                        .build()
                )
                .collect(Collectors.toList());

        guide.setGuideCategories(categories);

        guideRepo.save(guide);
        return GuideResponse.builder()
                .id(guide.getId())
                .title(guide.getTitle())
                .date(guide.getDate())
                .content(guide.getContent())
                .source(guide.getSource())
                .toolName(guide.getToolName())
                .func(guide.getFunc())
                .url(guide.getUrl())
                .image(guide.getImage())
                .toolImage(guide.getToolImage())
                .isBookmarked(false)
                .categories(guide.getGuideCategories().stream()
                        .map(category -> GuideCategoryResponse.builder()
                                .name(category.getName())
                                .build())
                        .collect(Collectors.toList())
                )
                .build();
    }

    @Override
    public List<GuideResponse> getGuideList(Long userId) {
        List<Guide> response = guideRepo.findAll();

        List<GuideBookmark> guideBookmarks = guideBookmarkRepo.findByUserId(userId);
        Map<Guide, Boolean> bookmarkMap = new HashMap<>();

        for (GuideBookmark bookmark : guideBookmarks) {
            bookmarkMap.put(bookmark.getGuide(), true);
        }

        return response.stream()
                .map(guide -> GuideResponse.builder()
                        .id(guide.getId())
                        .title(guide.getTitle())
                        .date(guide.getDate())
                        .content(guide.getContent())
                        .source(guide.getSource())
                        .toolName(guide.getToolName())
                        .func(guide.getFunc())
                        .url(guide.getUrl())
                        .image(guide.getImage())
                        .toolImage(guide.getToolImage())
                        .isBookmarked(bookmarkMap.get(guide) != null)
                        .categories(guide.getGuideCategories().stream()
                                .map(category -> GuideCategoryResponse.builder()
                                        .name(category.getName())
                                        .build())
                                .collect(Collectors.toList())
                        )
                        .build()
                )
                .collect(Collectors.toList());
    }

    @Override
    public GuideResponse getGuide(Long userId, Long guideId) {
        Guide guide = guideRepo.findById(guideId)
                .orElseThrow(() -> new NotFoundException(GUIDE_NOT_FOUND));

        List<GuideBookmark> guideBookmarks = guideBookmarkRepo.findByGuideAndUserId(guide, userId);

        return GuideResponse.builder()
                .id(guide.getId())
                .title(guide.getTitle())
                .date(guide.getDate())
                .content(guide.getContent())
                .source(guide.getSource())
                .toolName(guide.getToolName())
                .func(guide.getFunc())
                .url(guide.getUrl())
                .image(guide.getImage())
                .toolImage(guide.getToolImage())
                .isBookmarked(!guideBookmarks.isEmpty())
                .categories(guide.getGuideCategories().stream()
                        .map(category -> GuideCategoryResponse.builder()
                                .name(category.getName())
                                .build())
                        .collect(Collectors.toList())
                )
                .build();
    }

    @Override
    @Transactional
    public void deleteGuide(Long guideId) {
        Guide guide = guideRepo.findById(guideId)
                .orElseThrow(() -> new NotFoundException(GUIDE_NOT_FOUND));

        guideRepo.delete(guide);
    }

    @Override
    @Transactional
    public void addBookmark(Long userId, Long guideId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Guide guide = guideRepo.findById(guideId)
                .orElseThrow(() -> new NotFoundException(GUIDE_NOT_FOUND));

        // 이미 등록된 북마크 체크
        if (!guideBookmarkRepo.findByGuideAndUserId(guide, userId).isEmpty())
            throw new DuplicateException(GUIDE_BOOKMARK_DUPLICATED);

        GuideBookmark guideBookmark = GuideBookmark.builder()
                .user(user)
                .guide(guide)
                .build();

        guideBookmarkRepo.save(guideBookmark);
    }

    @Override
    @Transactional
    public void unBookmark(Long userId, Long guideId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));

        Guide guide = guideRepo.findById(guideId)
                .orElseThrow(() -> new NotFoundException(GUIDE_NOT_FOUND));

        // 등록된 북마크 체크
        List<GuideBookmark> bookmarks = guideBookmarkRepo.findByGuideAndUserId(guide, userId);
        if (bookmarks.isEmpty())
            throw new NotFoundException(GUIDE_BOOKMARK_NOT_FOUND);

        guideBookmarkRepo.deleteAll(bookmarks);
    }
}
