package com.selectool.dto.tool.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ToolPlanCreateRequest {
    private String title;

    private String volume;

    private String cost;

    private List<ToolPlanFunctionCreateRequest> planFunctions;

    @Builder
    public ToolPlanCreateRequest(String title, String volume, String cost, List<ToolPlanFunctionCreateRequest> planFunctions) {
        this.title = title;
        this.volume = volume;
        this.cost = cost;
        this.planFunctions = planFunctions;
    }
}
