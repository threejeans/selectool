package com.selectool.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserListResponse {
    @ApiModelProperty(value = "구글 유저")
    List<UserResponse> googleUsers;

    @ApiModelProperty(value = "카카오 유저")
    List<UserResponse> kakaoUsers;

    @ApiModelProperty(value = "네이버 유저")
    List<UserResponse> naverUsers;

    @Builder
    public UserListResponse(List<UserResponse> googleUsers, List<UserResponse> kakaoUsers, List<UserResponse> naverUsers){
        this.googleUsers = googleUsers;
        this.kakaoUsers = kakaoUsers;
        this.naverUsers = naverUsers;
    }
}
