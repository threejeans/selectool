package com.selectool.repository;

import com.selectool.entity.Corp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CorpRepo extends JpaRepository<Corp, Long> {
}
