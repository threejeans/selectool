package com.selectool.dto.corp.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 분류 생성 모델")
public class CorpCategoryCreateRequest {
    @ApiModelProperty(value = "기업 분류 명")
    private String name;

    public CorpCategoryCreateRequest(String name) {
        this.name = name;
    }
}
