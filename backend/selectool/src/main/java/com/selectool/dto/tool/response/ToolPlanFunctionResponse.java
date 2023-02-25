package com.selectool.dto.tool.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolPlanFunctionResponse {
    private Long id;

    private String func;

    @Builder
    public ToolPlanFunctionResponse(Long id, String func) {
        this.id = id;
        this.func = func;
    }
}
