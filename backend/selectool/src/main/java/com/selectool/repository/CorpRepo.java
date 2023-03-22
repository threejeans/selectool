package com.selectool.repository;

import com.selectool.entity.Corp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CorpRepo extends JpaRepository<Corp, Long> {
    List<Corp> findByNameKrContainingOrNameEnContainingIgnoreCase(String nameKr, String nameEn);
}
