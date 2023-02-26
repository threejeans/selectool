package com.selectool.dto.tool.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "주요 고객 생성 모델")
public class ClientCreateRequest {
    private Long id = 0L;

    @ApiModelProperty(value = "주요 고객사 명")
    private String name;

    @ApiModelProperty(value = "주요 고객사 이미지 주소")
    private String image;

    @ApiModelProperty(value = "주요 고객사 사이트 주소")
    private String url;

    @Builder
    public ClientCreateRequest(Long id, String name, String image, String url) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.url = url;
    }
}
