package com.selectool;

import com.selectool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByGoogle(String google);

    Optional<User> findByNaver(String naver);

    Optional<User> findByKakao(String kakao);

    List<User> findByGoogleContains(String google);

    List<User> findByNaverContains(String naver);

    List<User> findByKakaoContains(String kakao);

    List<User> findByIdIn(List<Long> userIds);
}
