package com.selectool.service;

import com.selectool.config.JwtAdminUtil;
import com.selectool.dto.user.response.ServiceTokenResponse;
import com.selectool.entity.Auth;
import com.selectool.exception.NotFoundException;
import com.selectool.exception.NotMatchException;
import com.selectool.repository.AuthRepo;
import io.jsonwebtoken.Claims;
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
public class AuthAdminServiceImpl implements AuthAdminService {
    private final AuthRepo authRepo;
    private final JwtAdminUtil jwtAdminUtil;

    @Override
    @Transactional
    public ServiceTokenResponse refresh(String refreshToken) {
        Claims body = jwtAdminUtil.getClaimsToken(refreshToken);
        Long adminId = Long.valueOf(String.valueOf(body.get("id")));

        Auth auth = authRepo.findById(adminId)
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));
        if (!auth.getRefreshToken().equals(refreshToken)) {
            throw new NotMatchException(AUTH_NOT_MATCH);
        }
        return ServiceTokenResponse.builder()
                .accessToken(jwtAdminUtil.createAccessToken(adminId))
                .refreshToken(refreshToken)
                .build();
    }
}
