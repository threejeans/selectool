package com.selectool.service;

import com.selectool.repository.UserRepo;
import com.selectool.config.Constant;
import com.selectool.dto.request.UserCreateRequest;
import com.selectool.dto.request.UserUpdateRequest;
import com.selectool.dto.response.UserListResponse;
import com.selectool.dto.response.UserResponse;
import com.selectool.entity.User;
import com.selectool.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
            {
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
                .image(user.getImage())
                .build();
    }

    @Override
    public UserListResponse getUserList(String email) {
//        List<UserResponse> googleUsers = userRepo.findByGoogleContains(email).stream()
//                .map(user -> UserResponse.builder()
//                        .id(user.getId())
//                        .name(user.getName())
//                        .image(user.getImage())
//                        .build())
//                .collect(Collectors.toList());
//        List<UserResponse> naverUsers = userRepo.findByNaverContains(email).stream()
//                .map(user -> UserResponse.builder()
//                        .id(user.getId())
//                        .name(user.getName())
//                        .image(user.getImage())
//                        .build())
//                .collect(Collectors.toList());
//        List<UserResponse> kakaoUsers = userRepo.findByKakaoContains(email).stream()
//                .map(user -> UserResponse.builder()
//                        .id(user.getId())
//                        .name(user.getName())
//                        .image(user.getImage())
//                        .build())
//                .collect(Collectors.toList());
//        return UserListResponse.builder()
//                .googleUsers(googleUsers)
//                .naverUsers(naverUsers)
//                .kakaoUsers(kakaoUsers)
//                .build();
        return null;
    }

    @Override
    @Transactional
    public void updateUserInfo(UserUpdateRequest request, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.updateInfo(request.getName());
    }

    @Override
    @Transactional
    public void updateUserImage(String image, Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.updateImage(image);
    }

    @Override
    @Transactional
    public void withdraw(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND));
        user.withdraw();
    }

    @Override
    public List<UserResponse> getUserList(List<Long> userIds) {
        List<UserResponse> userResponses = userRepo.findByIdIn(userIds).stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
        return userResponses;
    }
}
