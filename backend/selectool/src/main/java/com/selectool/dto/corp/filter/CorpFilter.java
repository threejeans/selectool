package com.selectool.dto.corp.filter;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class CorpFilter {
    String name;

    List<String> categories = new ArrayList<>();

    @Builder
    public CorpFilter(String name, List<String> categories) {
        this.name = name;
        this.categories = categories;
    }
}
