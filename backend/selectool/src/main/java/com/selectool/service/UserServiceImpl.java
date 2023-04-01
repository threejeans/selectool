package com.selectool.service;

import com.selectool.config.Constant;
import com.selectool.dto.user.request.UserCreateRequest;
import com.selectool.dto.user.request.UserUpdateRequest;
import com.selectool.dto.user.response.UserResponse;
import com.selectool.entity.User;
import com.selectool.exception.NotFoundException;
import com.selectool.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.selectool.exception.NotFoundException.USER_NOT_FOUND;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;

    @Transactional
    @Override
    public UserResponse getUser(Constant.SocialLoginType socialLoginType, UserCreateRequest request) {
        switch (socialLoginType) {
            case GOOGLE:
            case NAVER:
            case KAKAO: {
                User user = userRepo.findByTypeAndEmail(socialLoginType.name(), request.getEmail())
                        .orElseGet(() -> {
                            User newUser = User.builder()
                                    .name(request.getName())
                                    .type(socialLoginType.name())
                                    .email(request.getEmail())
                                    .image(request.getImage())
                                    .build();
                            userRepo.save(newUser);
                            return newUser;
                        });
                if (!user.isActive()) user.setActive();
                return UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build();
            }
            default: {
                throw new IllegalArgumentException("알 수 없는 소셜 유저 형식입니다.");
            }
        }
    }

    @Override
    public UserResponse getUserInfo(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .type(user.getType())
                .email(user.getEmail())
                .subscribeEmail(user.getSubscribeEmail())
                .image(user.getImage())
                .build();
    }

    @Override
    @Transactional
    public void updateUserInfo(UserUpdateRequest request, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.updateInfo(request.getName(), request.getSubscribeEmail(), request.getImage());
    }

    @Override
    @Transactional
    public void withdraw(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.withdraw();
    }
}
