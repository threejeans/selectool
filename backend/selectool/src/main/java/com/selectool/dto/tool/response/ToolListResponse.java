package com.selectool.dto.tool.response;

import com.selectool.dto.tool.request.ClientCreateRequest;
import com.selectool.dto.tool.request.ToolFunctionCreateRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 목록 응답 모델")
public class ToolListResponse {
    private Long id;

    @ApiModelProperty(value = "툴 국문명")
    private String nameKr;

    @ApiModelProperty(value = "툴 영문명")
    private String nameEn;

    @ApiModelProperty(value = "툴 한 줄 소개")
    private String info;

    @ApiModelProperty(value = "툴 호버 메세지")
    private String msg;

    @ApiModelProperty(value = "툴 토픽")
    private String topic;

    @ApiModelProperty(value = "툴 국가")
    private String country;

    @ApiModelProperty(value = "툴 썸네일 이미지 주소")
    private String image;

    @ApiModelProperty(value = "툴 북마크 여부")
    private Boolean isBookmarked;

    @ApiModelProperty(value = "툴 분류 목록")
    private List<ToolCategoryResponse> categories;

    @Builder
    public ToolListResponse(Long id, String nameKr, String nameEn, String info, String msg, String topic, String country, String image, Boolean isBookmarked, List<ToolCategoryResponse> categories) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.topic = topic;
        this.country = country;
        this.image = image;
        this.isBookmarked = isBookmarked;
        this.categories = categories;
    }
}
