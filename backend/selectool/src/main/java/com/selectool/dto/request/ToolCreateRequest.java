package com.selectool.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolCreateRequest {
    private String name_kr;

    private String name_en;

    private String info;

    private String msg;

    private String country;

    private String url;

    private String image;

    @Builder
    public ToolCreateRequest(String name_kr, String name_en, String info, String msg, String country, String url, String image) {
        this.name_kr = name_kr;
        this.name_en = name_en;
        this.info = info;
        this.msg = msg;
        this.country = country;
        this.url = url;
        this.image = image;
    }
}
