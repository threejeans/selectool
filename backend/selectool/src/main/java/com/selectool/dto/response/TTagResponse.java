package com.selectool.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TTagResponse {
    private Long id;

    private String name;

    @Builder
    public TTagResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
