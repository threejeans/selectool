package com.selectool.dto.tool.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolCategoryCreateRequest {
    private String name;

    @Builder
    public ToolCategoryCreateRequest(String name) {
        this.name = name;
    }
}
