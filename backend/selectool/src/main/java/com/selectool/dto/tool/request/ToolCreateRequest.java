package com.selectool.dto.tool.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ToolCreateRequest {
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

    @Builder
    public ToolCreateRequest(String name, String email, String image) {
    }
}
