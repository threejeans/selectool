package com.selectool.repository;

import com.selectool.dto.corp.filter.CorpFilter;
import com.selectool.entity.Corp;

import java.util.List;

public interface CorpCustomRepo {
    public List<Corp> searchByFilter(CorpFilter filter);
}
