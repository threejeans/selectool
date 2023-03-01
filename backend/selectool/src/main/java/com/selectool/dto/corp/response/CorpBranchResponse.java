package com.selectool.dto.corp.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 자회사 응답 모델")
public class CorpBranchResponse {
    private Long id;

    private String name;

    private String image;

    @Builder
    public CorpBranchResponse(Long id, String name, String image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}
