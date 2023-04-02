package com.selectool.dto.user.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserUpdateRequest {
    @ApiModelProperty(value = "유저 이름")
    private String name;

    @ApiModelProperty(value = "구독 이메일")
    private String subscribeEmail;

    @ApiModelProperty(value = "이미지 주소")
    private String image;

    @ApiModelProperty(value = "이메일 수신 여부")
    private Boolean subscribeActive;
}
