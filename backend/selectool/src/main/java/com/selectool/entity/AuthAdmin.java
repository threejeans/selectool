package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.concurrent.TimeUnit;

@RedisHash("authAdmin")
@NoArgsConstructor
@Getter
public class AuthAdmin {
    @Id
    private Long adminId;

    private String refreshToken;

    @TimeToLive(unit = TimeUnit.MILLISECONDS)
    private Long expiration;

    @Builder
    public AuthAdmin(Long adminId, String refreshToken, Long expiration) {
        this.adminId = adminId;
        this.refreshToken = refreshToken;
        this.expiration = expiration;
    }
}
