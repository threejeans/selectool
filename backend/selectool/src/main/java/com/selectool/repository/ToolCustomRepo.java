package com.selectool.repository;

import com.selectool.dto.tool.filter.ToolFilter;
import com.selectool.entity.Tool;

import java.util.List;

public interface ToolCustomRepo {
    public List<Tool> searchByFilter(ToolFilter filter);
}
