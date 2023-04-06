package com.selectool.dto.demand.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "요청 수정 모델")
public class DemandUpdateRequest {
    @ApiModelProperty(value = "요청 상태 (true 완료 / false 미완료 / null 보류)")
    private Boolean status;
}
