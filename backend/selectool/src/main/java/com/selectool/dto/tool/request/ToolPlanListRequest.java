package com.selectool.dto.tool.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 가격 플랜 목록 수정 모델")
public class ToolPlanListRequest {
    @ApiModelProperty(value = "툴 가격 플랜 목록")
    private List<ToolPlanCreateRequest> plans = new ArrayList<>();

    @Builder
    public ToolPlanListRequest(List<ToolPlanCreateRequest> plans) {
        this.plans = plans;
    }
}
