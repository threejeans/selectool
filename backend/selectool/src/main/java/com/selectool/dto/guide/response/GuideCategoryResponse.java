package com.selectool.dto.guide.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "가이드 분류 생성 모델")
public class GuideCategoryResponse {
    @ApiModelProperty(value = "카테고리 분류")
    private String name;
}
