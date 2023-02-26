package com.selectool.dto.tool.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 분류 응답 모델")
public class ToolCategoryResponse {
    @ApiModelProperty(value = "툴 분류 명")
    private String name;

    @Builder
    public ToolCategoryResponse(String name) {
        this.name = name;
    }
}
