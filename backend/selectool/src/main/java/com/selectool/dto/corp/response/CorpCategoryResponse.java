package com.selectool.dto.corp.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 분류 응답 모델")
public class CorpCategoryResponse {
    @ApiModelProperty(value = "기업 분류 명")
    private String name;

    @Builder
    public CorpCategoryResponse(String name) {
        this.name = name;
    }
}
