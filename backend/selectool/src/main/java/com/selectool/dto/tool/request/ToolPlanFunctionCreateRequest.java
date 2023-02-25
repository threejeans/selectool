package com.selectool.dto.tool.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolPlanFunctionCreateRequest {
    private String func;

    @Builder
    public ToolPlanFunctionCreateRequest(String func) {
        this.func = func;
    }
}
