package com.selectool.dto.corp.request;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 조직 문화 생성 모델")
public class CorpCultureCreateRequest {
    private String title;

    private String content;

    @Builder
    public CorpCultureCreateRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
