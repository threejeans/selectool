package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.concurrent.TimeUnit;

@RedisHash("auth")
@NoArgsConstructor
@Getter
public class Auth {
    @Id
    private Long userId;

    private String refreshToken;

    @TimeToLive(unit = TimeUnit.DAYS)
    private Long expiration;

    @Builder
    public Auth(Long userId, String refreshToken, Long expiration) {
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.expiration = expiration;
    }
}
