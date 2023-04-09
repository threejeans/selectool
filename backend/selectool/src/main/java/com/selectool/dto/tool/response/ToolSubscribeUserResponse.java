package com.selectool.dto.tool.response;

import com.selectool.dto.tool.response.ToolSimpleResponse;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class ToolSubscribeUserResponse {
    private Long id;

    private String type;

    private String email;

    private String subscribeEmail;

    private Boolean subscribeActive;

    private Boolean emailVerified;

    private LocalDateTime createdAt;

    private List<ToolSimpleResponse> tools;

    @Builder
    public ToolSubscribeUserResponse(Long id, String type, String email, String subscribeEmail, Boolean subscribeActive, Boolean emailVerified, LocalDateTime createdAt, List<ToolSimpleResponse> tools) {
        this.id = id;
        this.type = type;
        this.email = email;
        this.subscribeEmail = subscribeEmail;
        this.subscribeActive = subscribeActive;
        this.emailVerified = emailVerified;
        this.createdAt = createdAt;
        this.tools = tools;
    }

    public void updateMinCreatedAt(LocalDateTime createdAt) {
        if (this.createdAt.compareTo(createdAt) > 0) this.createdAt = createdAt;
    }
}
