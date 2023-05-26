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
@ApiModel(value = "툴 기능 목록 수정 모델")
public class ToolFunctionListRequest {
    @ApiModelProperty(value = "툴 핵심 기능 목록")
    private List<ToolFunctionCreateRequest> toolFunctions = new ArrayList<>();

    @Builder
    public ToolFunctionListRequest(List<ToolFunctionCreateRequest> toolFunctions) {
        this.toolFunctions = toolFunctions;
    }
}
