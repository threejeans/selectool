package com.selectool.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolResponse {
    private Long id;

    private String name_kr;

    private String name_en;

    private String info;

    private String msg;

    private String country;

    private boolean url;

    private String image;

    @Builder
    public ToolResponse(Long id, String name_kr, String name_en, String info, String msg, String country, boolean url, String image) {
        this.id = id;
        this.name_kr = name_kr;
        this.name_en = name_en;
        this.info = info;
        this.msg = msg;
        this.country = country;
        this.url = url;
        this.image = image;
    }
}
