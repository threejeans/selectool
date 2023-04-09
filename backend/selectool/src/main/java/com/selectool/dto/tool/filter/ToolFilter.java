package com.selectool.dto.tool.filter;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ToolFilter {
    String name;

    String country;

    List<String> categories = new ArrayList<>();

    Boolean onlyTrial;

    String orderTarget;

    @Builder
    public ToolFilter(String name, String country, List<String> categories, Boolean onlyTrial, String orderTarget) {
        this.name = name;
        this.country = country;
        this.categories = categories;
        this.onlyTrial = onlyTrial;
        this.orderTarget = orderTarget;
    }
}
