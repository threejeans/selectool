package com.selectool.dto.guide.filter;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class GuideFilter {
    String toolName;

    String func;

    List<String> categories = new ArrayList<>();

    @Builder
    public GuideFilter(String toolName, String func, List<String> categories) {
        this.toolName = toolName;
        this.func = func;
        this.categories = categories;
    }
}
