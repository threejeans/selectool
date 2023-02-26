package com.selectool.dto.tool.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientCreateRequest {
    private Long id = 0L;

    private String name;

    private String image;

    private String url;

    @Builder
    public ClientCreateRequest(Long id, String name, String image, String url) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.url = url;
    }
}
