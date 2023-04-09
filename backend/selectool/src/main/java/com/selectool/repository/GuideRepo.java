package com.selectool.repository;

import com.selectool.entity.Guide;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuideRepo extends JpaRepository<Guide, Long>, GuideCustomRepo {
}
