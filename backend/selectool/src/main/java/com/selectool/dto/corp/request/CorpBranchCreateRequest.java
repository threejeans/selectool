package com.selectool.dto.corp.request;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 자회사 생성 모델")
public class CorpBranchCreateRequest {
    private String name;

    private String image;

    @Builder
    public CorpBranchCreateRequest(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
