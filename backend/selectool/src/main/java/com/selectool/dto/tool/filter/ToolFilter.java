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

    @Builder
    public ToolFilter(String name, String country, List<String> categories) {
        this.name = name;
        this.country = country;
        this.categories = categories;
    }
}
