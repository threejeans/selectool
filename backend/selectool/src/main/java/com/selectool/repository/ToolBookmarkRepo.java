package com.selectool.repository;

import com.selectool.entity.Tool;
import com.selectool.entity.ToolBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ToolBookmarkRepo extends JpaRepository<ToolBookmark, Long> {
    List<ToolBookmark> findByUserId(Long userId);

    List<ToolBookmark> findByToolAndUserId(Tool tool, Long userId);
}
