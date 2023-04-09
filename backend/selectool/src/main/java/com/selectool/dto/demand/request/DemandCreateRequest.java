package com.selectool.dto.demand.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "요청 생성 모델")
public class DemandCreateRequest {
    @ApiModelProperty(value = "요청 내용")
    private String content;

    @ApiModelProperty(value = "요청 구분 툴/기업")
    private String type;
}
