package com.selectool.repository;

import com.selectool.entity.Corp;
import com.selectool.entity.CorpBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CorpBookmarkRepo extends JpaRepository<CorpBookmark, Long> {
    List<CorpBookmark> findByUserId(Long userId);

    List<CorpBookmark> findByCorpAndUserId(Corp corp, Long userId);
}
