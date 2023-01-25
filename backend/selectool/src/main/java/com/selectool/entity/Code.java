package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.concurrent.TimeUnit;

@RedisHash("code")
@NoArgsConstructor
@Getter
public class Code {
    @Id
    private String email;

    private String code;

    @TimeToLive(unit = TimeUnit.DAYS)
    private Long expiration;

    @Builder
    public Code(String email, String code, Long expiration) {
        this.email = email;
        this.code = code;
        this.expiration = expiration;
    }
}
