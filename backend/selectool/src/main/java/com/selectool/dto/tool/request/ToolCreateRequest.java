package com.selectool.dto.tool.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "툴 생성 모델")
public class ToolCreateRequest {
    private Long id = 0L;

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

    @ApiModelProperty(value = "툴 사이트 주소")
    private String url;

    @ApiModelProperty(value = "툴 안드로이드 평점")
    private String aos;

    @ApiModelProperty(value = "툴 애플 평점")
    private String ios;

    @ApiModelProperty(value = "무료 플랜 유무")
    private Boolean trial = false;

    @ApiModelProperty(value = "툴 분류 목록")
    private List<ToolCategoryCreateRequest> categories = new ArrayList<>();

    @ApiModelProperty(value = "툴 핵심 기능 목록")
    private List<ToolFunctionCreateRequest> toolFunctions = new ArrayList<>();

    @ApiModelProperty(value = "주요 고객 목록")
    private List<ClientCreateRequest> clients = new ArrayList<>();

    @ApiModelProperty(value = "툴 가격 플랜 목록")
    private List<ToolPlanCreateRequest> plans = new ArrayList<>();

    @Builder
    public ToolCreateRequest(Long id, String nameKr, String nameEn, String info, String msg, String topic, String country, String image, String url, String aos, String ios, Boolean trial, List<ToolCategoryCreateRequest> categories, List<ToolFunctionCreateRequest> toolFunctions, List<ClientCreateRequest> clients, List<ToolPlanCreateRequest> plans) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.topic = topic;
        this.country = country;
        this.image = image;
        this.url = url;
        this.aos = aos;
        this.ios = ios;
        this.trial = trial;
        this.categories = categories;
        this.toolFunctions = toolFunctions;
        this.clients = clients;
        this.plans = plans;
    }
}
