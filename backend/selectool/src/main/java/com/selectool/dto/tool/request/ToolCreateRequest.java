package com.selectool.dto.tool.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ToolCreateRequest {
    private String nameKr;

    private String nameEn;

    private String info;

    private String msg;

    private String topic;

    private String category;

    private String country;

    private String image;

    private String url;

    private String aos;

    private String ios;

    private List<ToolFunctionCreateRequest> toolFunctions;

    private List<ClientCreateRequest> clients;

    private List<ToolPlanCreateRequest> plans;

    @Builder
    public ToolCreateRequest(String nameKr, String nameEn, String info, String msg, String topic, String category, String country, String image, String url, String aos, String ios, List<ToolFunctionCreateRequest> toolFunctions, List<ClientCreateRequest> clients, List<ToolPlanCreateRequest> plans) {
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.topic = topic;
        this.category = category;
        this.country = country;
        this.image = image;
        this.url = url;
        this.aos = aos;
        this.ios = ios;
        this.toolFunctions = toolFunctions;
        this.clients = clients;
        this.plans = plans;
    }
}
