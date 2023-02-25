package com.selectool.dto.tool.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ToolPlanResponse {
    private Long id;

    private String title;

    private String volume;

    private String cost;

    private List<ToolPlanFunctionResponse> planFunctions;

    @Builder
    public ToolPlanResponse(Long id, String title, String volume, String cost, List<ToolPlanFunctionResponse> planFunctions) {
        this.id = id;
        this.title = title;
        this.volume = volume;
        this.cost = cost;
        this.planFunctions = planFunctions;
    }
}
