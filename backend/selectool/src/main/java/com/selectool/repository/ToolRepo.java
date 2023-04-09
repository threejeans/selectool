package com.selectool.repository;

import com.selectool.entity.Tool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToolRepo extends JpaRepository<Tool, Long>, ToolCustomRepo {
    List<Tool> findByNameKrContainingOrNameEnContainingIgnoreCase(String nameKr, String nameEn);
}
