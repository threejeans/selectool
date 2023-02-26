package com.selectool.service;

import com.selectool.config.JwtUtil;
import com.selectool.dto.user.response.ServiceTokenResponse;
import com.selectool.entity.Auth;
import com.selectool.exception.NotFoundException;
import com.selectool.exception.NotMatchException;
import com.selectool.repository.AuthRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.selectool.exception.NotFoundException.AUTH_NOT_FOUND;
import static com.selectool.exception.NotMatchException.AUTH_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final AuthRepo authRepo;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public ServiceTokenResponse refresh(String refreshToken, Long userId) {
        Auth auth = authRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));
        if (!auth.getRefreshToken().equals(refreshToken)) {
            throw new NotMatchException(AUTH_NOT_MATCH);
        }
        ServiceTokenResponse response = ServiceTokenResponse.builder()
                .accessToken(jwtUtil.createAccessToken(userId))
                .refreshToken(refreshToken)
                .build();
        return response;
    }
}
