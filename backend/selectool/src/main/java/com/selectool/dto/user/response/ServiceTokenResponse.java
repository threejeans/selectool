package com.selectool.dto.user.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServiceTokenResponse {
    @ApiModelProperty(value = "액세스 토큰")
    private String accessToken;

    @ApiModelProperty(value = "리프레쉬 토큰")
    private String refreshToken;

    @Builder
    public ServiceTokenResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
