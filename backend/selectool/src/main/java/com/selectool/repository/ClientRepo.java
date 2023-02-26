package com.selectool.repository;

import com.selectool.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepo extends JpaRepository<Client, Long> {
    List<Client> findByNameContaining(String name);
}
