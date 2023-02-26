package com.selectool.dto.tool.response;

import com.selectool.entity.ToolCategory;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ToolResponse {
    private Long id;

    private String nameKr;

    private String nameEn;

    private String info;

    private String msg;

    private String country;

    private String image;

    private String url;

    private String aos;

    private String ios;

    private Boolean isBookmarked;

    private List<ToolCategoryResponse> categories;

    private List<ToolFunctionResponse> toolFunctions;

    private List<ClientResponse> clients;

    private List<ToolPlanResponse> plans;

    @Builder
    public ToolResponse(Long id, String nameKr, String nameEn, String info, String msg, String country, String image, String url, String aos, String ios, Boolean isBookmarked, List<ToolCategoryResponse> categories, List<ToolFunctionResponse> toolFunctions, List<ClientResponse> clients, List<ToolPlanResponse> plans) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.country = country;
        this.image = image;
        this.url = url;
        this.aos = aos;
        this.ios = ios;
        this.isBookmarked = isBookmarked;
        this.categories = categories;
        this.toolFunctions = toolFunctions;
        this.clients = clients;
        this.plans = plans;
    }
}
