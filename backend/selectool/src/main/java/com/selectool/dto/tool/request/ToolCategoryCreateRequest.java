package com.selectool.dto.tool.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 분류 생성 모델")
public class ToolCategoryCreateRequest {
    @ApiModelProperty(value = "툴 분류 명")
    private String name;

    @Builder
    public ToolCategoryCreateRequest(String name) {
        this.name = name;
    }
}
