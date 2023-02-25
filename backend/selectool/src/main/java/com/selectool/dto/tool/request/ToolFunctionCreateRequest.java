package com.selectool.dto.tool.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolFunctionCreateRequest {
    private String name;

    private String content;

    @Builder
    public ToolFunctionCreateRequest(String name, String content) {
        this.name = name;
        this.content = content;
    }
}
