package com.selectool.dto.tool.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientResponse {
    private Long id;

    private String name;

    private String image;

    private String url;

    @Builder
    public ClientResponse(Long id, String name, String image, String url) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.url = url;
    }
}
