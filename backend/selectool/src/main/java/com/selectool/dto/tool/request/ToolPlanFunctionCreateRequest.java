package com.selectool.dto.tool.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 가격 플랜 기능 생성 모델")
public class ToolPlanFunctionCreateRequest {
    @ApiModelProperty(value = "툴 가격 플랜 기능")
    private String func;

    @Builder
    public ToolPlanFunctionCreateRequest(String func) {
        this.func = func;
    }
}
