package com.selectool.dto.tool.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 가격 플랜 기능 응답 모델")
public class ToolPlanFunctionResponse {
    private Long id;

    @ApiModelProperty(value = "툴 가격 플랜 기능")
    private String func;

    @Builder
    public ToolPlanFunctionResponse(Long id, String func) {
        this.id = id;
        this.func = func;
    }
}
