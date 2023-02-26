package com.selectool.dto.tool.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 핵심 기능 응답 모델")
public class ToolFunctionResponse {
    private Long id;

    @ApiModelProperty(value = "툴 핵심 기능 명")
    private String name;

    @ApiModelProperty(value = "툴 핵심 기능 상세 설명")
    private String content;

    @Builder
    public ToolFunctionResponse(Long id, String name, String content) {
        this.id = id;
        this.name = name;
        this.content = content;
    }
}
