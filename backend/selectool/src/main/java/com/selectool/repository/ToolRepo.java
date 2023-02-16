package com.selectool.repository;

import com.selectool.entity.Tool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToolRepo extends JpaRepository<Tool, Long> {
}
