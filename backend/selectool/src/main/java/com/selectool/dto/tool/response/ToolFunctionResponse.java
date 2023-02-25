package com.selectool.dto.tool.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolFunctionResponse {
    private Long id;

    private String name;

    private String content;

    @Builder
    public ToolFunctionResponse(Long id, String name, String content) {
        this.id = id;
        this.name = name;
        this.content = content;
    }
}
