package com.selectool.dto.user.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailRequest {
    private String address;
    private String title;
    private String content;

    @Builder
    public EmailRequest(String address, String title, String content) {
        this.address = address;
        this.title = title;
        this.content = content;
    }
}
