package com.selectool.dto.corp.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 조직 문화 응답 모델")
public class CorpCultureResponse {
    private Long id;

    private String title;

    private String content;

    @Builder
    public CorpCultureResponse(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
