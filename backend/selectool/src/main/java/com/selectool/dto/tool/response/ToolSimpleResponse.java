package com.selectool.dto.tool.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 목록 응답 모델")
public class ToolSimpleResponse {
    private Long id;

    @ApiModelProperty(value = "툴 국문명")
    private String nameKr;

    @ApiModelProperty(value = "툴 영문명")
    private String nameEn;

    @Builder
    public ToolSimpleResponse(Long id, String nameKr, String nameEn) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
    }
}
