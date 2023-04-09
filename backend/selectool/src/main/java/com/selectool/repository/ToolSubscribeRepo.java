package com.selectool.repository;

import com.selectool.entity.Tool;
import com.selectool.entity.ToolSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToolSubscribeRepo extends JpaRepository<ToolSubscribe, Long> {
    List<ToolSubscribe> findByUserId(Long userId);

    List<ToolSubscribe> findByToolAndUserId(Tool tool, Long userId);
}
