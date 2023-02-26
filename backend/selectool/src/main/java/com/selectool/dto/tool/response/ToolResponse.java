package com.selectool.dto.tool.response;

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

    private String category;

    private String country;

    private String image;

    private String url;

    private String aos;

    private String ios;

    private Boolean isBookmarked;

    private List<ToolFunctionResponse> toolFunctions;

    private List<ClientResponse> clients;

    private List<ToolPlanResponse> plans;

    @Builder
    public ToolResponse(Long id, String nameKr, String nameEn, String info, String msg, String category, String country, String image, String url, String aos, String ios, Boolean isBookmarked, List<ToolFunctionResponse> toolFunctions, List<ClientResponse> clients, List<ToolPlanResponse> plans) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.category = category;
        this.country = country;
        this.image = image;
        this.url = url;
        this.aos = aos;
        this.ios = ios;
        this.isBookmarked = isBookmarked;
        this.toolFunctions = toolFunctions;
        this.clients = clients;
        this.plans = plans;
    }
}
