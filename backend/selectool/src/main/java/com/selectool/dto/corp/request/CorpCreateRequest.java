package com.selectool.dto.corp.request;

import com.selectool.dto.tool.request.ToolCreateRequest;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "기업 생성 모델")
public class CorpCreateRequest {
    private String nameKr;

    private String nameEn;

    private String info;

    private String teamNameKr;

    private String teamNameEn;

    private String image;

    private String url;

    private String content;

    private Boolean isBookmarked;

    private List<CorpCategoryCreateRequest> categories = new ArrayList<>();

    private List<CorpBranchCreateRequest> branches;

    private List<CorpCultureCreateRequest> cultures;

    private List<ToolCreateRequest> tools;

    @Builder
    public CorpCreateRequest(String nameKr, String nameEn, String info, String teamNameKr, String teamNameEn, String image, String url, String content, Boolean isBookmarked, List<CorpCategoryCreateRequest> categories, List<CorpBranchCreateRequest> branches, List<CorpCultureCreateRequest> cultures, List<ToolCreateRequest> tools) {
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
