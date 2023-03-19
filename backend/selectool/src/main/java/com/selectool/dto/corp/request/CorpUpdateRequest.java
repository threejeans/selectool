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
@ApiModel(value = "기업 수정 모델")
public class CorpUpdateRequest {
    private Long id;

    private String nameKr;

    private String nameEn;

    private String info;

    private String teamNameKr;

    private String teamNameEn;

    private String image;

    private String url;

    private String content;

    private List<CorpCategoryUpdateRequest> categories = new ArrayList<>();

    private List<CorpBranchUpdateRequest> branches = new ArrayList<>();

    private List<CorpCultureUpdateRequest> cultures = new ArrayList<>();

    private List<ToolCreateRequest> tools = new ArrayList<>();

    @Builder
    public CorpUpdateRequest(Long id, String nameKr, String nameEn, String info, String teamNameKr, String teamNameEn, String image, String url, String content, List<CorpCategoryUpdateRequest> categories, List<CorpBranchUpdateRequest> branches, List<CorpCultureUpdateRequest> cultures, List<ToolCreateRequest> tools) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.teamNameKr = teamNameKr;
        this.teamNameEn = teamNameEn;
        this.image = image;
        this.url = url;
        this.content = content;
        this.categories = categories;
        this.branches = branches;
        this.cultures = cultures;
        this.tools = tools;
    }
}