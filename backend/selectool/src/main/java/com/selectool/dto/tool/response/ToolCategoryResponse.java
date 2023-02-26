package com.selectool.dto.tool.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolCategoryResponse {
    private String name;

    @Builder
    public ToolCategoryResponse(String name) {
        this.name = name;
    }
}
