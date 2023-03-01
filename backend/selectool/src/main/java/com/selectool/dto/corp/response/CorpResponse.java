package com.selectool.dto.corp.response;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 응답 모델")
public class CorpResponse {
    private Long id;

    private String nameKr;

    private String nameEn;

    private String info;

    private String teamNameKr;

    private String teamNameEn;

    private String image;

    private String url;

    private String content;

    private Boolean isBookmarked;

    private List<CorpCategoryResponse> categories;

    private List<CorpBranchResponse> branches;

    private List<CorpCultureResponse> cultures;

    private List<CorpToolResponse> tools;

    @Builder
    public CorpResponse(Long id, String nameKr, String nameEn, String info, String teamNameKr, String teamNameEn, String image, String url, String content, Boolean isBookmarked, List<CorpCategoryResponse> categories, List<CorpBranchResponse> branches, List<CorpCultureResponse> cultures, List<CorpToolResponse> tools) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.teamNameKr = teamNameKr;
        this.teamNameEn = teamNameEn;
        this.image = image;
        this.url = url;
        this.content = content;
        this.isBookmarked = isBookmarked;
        this.categories = categories;
        this.branches = branches;
        this.cultures = cultures;
        this.tools = tools;
    }
}
