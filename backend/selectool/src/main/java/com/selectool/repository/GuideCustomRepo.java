package com.selectool.repository;

import com.selectool.dto.guide.filter.GuideFilter;
import com.selectool.entity.Guide;

import java.util.List;

public interface GuideCustomRepo {
    public List<Guide> searchByFilter(GuideFilter filter);
}
