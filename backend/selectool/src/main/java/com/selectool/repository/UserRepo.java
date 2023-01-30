package com.selectool.repository;

import com.selectool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByTypeAndEmail(String type, String email);

    List<User> findByIdIn(List<Long> userIds);
}
