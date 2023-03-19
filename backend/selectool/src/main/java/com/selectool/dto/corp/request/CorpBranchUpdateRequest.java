package com.selectool.dto.corp.request;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 자회사 생성 모델")
public class CorpBranchUpdateRequest {
    private Long id = 0L;

    private String name;

    private String image;

    @Builder
    public CorpBranchUpdateRequest(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}