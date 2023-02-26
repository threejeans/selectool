package com.selectool.repository;

import com.selectool.entity.Guide;
import com.selectool.entity.GuideBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuideBookmarkRepo extends JpaRepository<GuideBookmark, Long> {
    List<GuideBookmark> findByUserId(Long userId);

    List<GuideBookmark> findByGuideAndUserId(Guide guide, Long userId);
}
