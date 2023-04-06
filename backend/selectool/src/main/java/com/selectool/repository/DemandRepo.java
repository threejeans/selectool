package com.selectool.repository;

import com.selectool.entity.Demand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DemandRepo extends JpaRepository<Demand, Long> {
    @Query(value = "select d from Demand d order by field(d.status, true)")
    List<Demand> findAllJPQL();
}
