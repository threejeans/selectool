package com.selectool.dto.guide.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "가이드 생성 모델")
public class GuideCreateRequest {
    @ApiModelProperty(value = "가이드 제목")
    private String title;

    @ApiModelProperty(value = "콘텐츠 일자")
    private LocalDateTime date;

    @ApiModelProperty(value = "콘텐츠 내용")
    private String content;

    @ApiModelProperty(value = "콘텐츠 소스")
    private String source;

    @ApiModelProperty(value = "툴 이름")
    private String toolName;

    @ApiModelProperty(value = "기능 분류")
    private String func;

    @ApiModelProperty(value = "콘텐츠 링크")
    private String url;

    @ApiModelProperty(value = "썸네일 이미지 주소")
    private String image;

    @ApiModelProperty(value = "툴 이미지")
    private String toolImage;

    @ApiModelProperty(value = "카테고리 분류 목록")
    private List<GuideCategoryCreateRequest> categories;

    @Builder
    public GuideCreateRequest(String title, LocalDateTime date, String content, String source, String toolName, String func, String url, String image, String toolImage, List<GuideCategoryCreateRequest> categories) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.source = source;
        this.toolName = toolName;
        this.func = func;
        this.url = url;
        this.image = image;
        this.toolImage = toolImage;
        this.categories = categories;
    }
}
