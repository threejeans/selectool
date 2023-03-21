package com.selectool.repository;

import com.selectool.entity.Corp;
import com.selectool.entity.CorpCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CorpCategoryRepo extends JpaRepository<CorpCategory, Long> {
    List<CorpCategory> findByCorp(Corp corp);
}
