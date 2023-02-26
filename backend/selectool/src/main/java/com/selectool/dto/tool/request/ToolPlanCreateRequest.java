package com.selectool.dto.tool.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 가격 플랜 생성 모델")
public class ToolPlanCreateRequest {
    @ApiModelProperty(value = "툴 가격 플랜 명")
    private String title;

    @ApiModelProperty(value = "툴 가격 플랜 용량")
    private String volume;

    @ApiModelProperty(value = "툴 가격 플랜 가격")
    private String cost;

    @ApiModelProperty(value = "툴 가격 플랜 기능 목록")
    private List<ToolPlanFunctionCreateRequest> planFunctions;

    @Builder
    public ToolPlanCreateRequest(String title, String volume, String cost, List<ToolPlanFunctionCreateRequest> planFunctions) {
        this.title = title;
        this.volume = volume;
        this.cost = cost;
        this.planFunctions = planFunctions;
    }
}
