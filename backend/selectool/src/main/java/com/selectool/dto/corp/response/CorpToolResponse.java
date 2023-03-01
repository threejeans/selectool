package com.selectool.dto.corp.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 사용 툴 응답 모델")
public class CorpToolResponse {
    private Long id;

    private String nameKr;

    private String nameEn;

    private String image;

    private String url;

    @Builder
    public CorpToolResponse(Long id, String nameKr, String nameEn, String image, String url) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.image = image;
        this.url = url;
    }
}
