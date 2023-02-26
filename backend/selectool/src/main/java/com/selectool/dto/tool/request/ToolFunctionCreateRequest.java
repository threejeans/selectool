package com.selectool.dto.tool.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 핵심 기능 생성 모델")
public class ToolFunctionCreateRequest {
    @ApiModelProperty(value = "툴 핵심 기능 명")
    private String name;

    @ApiModelProperty(value = "툴 핵심 기능 상세 설명")
    private String content;

    @Builder
    public ToolFunctionCreateRequest(String name, String content) {
        this.name = name;
        this.content = content;
    }
}
