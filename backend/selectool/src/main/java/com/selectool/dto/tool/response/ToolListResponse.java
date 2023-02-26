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

    private String country;

    private String image;

    private Boolean isBookmarked;

    private List<ToolCategoryResponse> categories;

    @Builder
    public ToolListResponse(Long id, String nameKr, String nameEn, String info, String msg, String country, String image, Boolean isBookmarked, List<ToolCategoryResponse> categories) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.country = country;
        this.image = image;
        this.isBookmarked = isBookmarked;
        this.categories = categories;
    }
}
