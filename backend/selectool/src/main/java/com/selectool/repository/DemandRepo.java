package com.selectool.repository;

import com.selectool.entity.Demand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandRepo extends JpaRepository<Demand, Long> {
}
