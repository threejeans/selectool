package com.selectool.dto.tool.response;

import com.selectool.dto.tool.request.ClientCreateRequest;
import com.selectool.dto.tool.request.ToolFunctionCreateRequest;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ToolListResponse {
    private Long id;

    private String nameKr;

    private String nameEn;

    private String info;

    private String msg;

    private String category;

    private String country;

    private String image;

    private Boolean isBookmarked;

    @Builder
    public ToolListResponse(Long id, String nameKr, String nameEn, String info, String msg, String category, String country, String image, Boolean isBookmarked) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.category = category;
        this.country = country;
        this.image = image;
        this.isBookmarked = isBookmarked;
    }
}
