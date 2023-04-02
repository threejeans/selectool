package com.selectool.dto.demand.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@ApiModel(value = "요청 응답 모델")
public class DemandResponse {
    private Long id;

    @ApiModelProperty(value = "회원 소셜 종류 GOOGLE/NAVER/KAKAO")
    private String userType;

    @ApiModelProperty(value = "회원 이메일")
    private String userEmail;

    @ApiModelProperty(value = "등록 일자")
    private LocalDateTime createdAt;

    @ApiModelProperty(value = "요청 내용")
    private String content;

    @ApiModelProperty(value = "요청 구분 툴/기업")
    private String type;

    @ApiModelProperty(value = "요청 상태 미처리: false, 처리 완료: true")
    private Boolean status;

    @Builder
    public DemandResponse(Long id, String userType, String userEmail, LocalDateTime createdAt, String content, String type, Boolean status) {
        this.id = id;
        this.userType = userType;
        this.userEmail = userEmail;
        this.createdAt = createdAt;
        this.content = content;
        this.type = type;
        this.status = status;
    }
}
