package com.selectool.entity;

import com.selectool.config.Constant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String name;

    private String google;

    private String naver;

    private String kakao;

    private String image;

    private boolean active;

    @Builder
    public User(String name, Constant.SocialLoginType socialLoginType, String email, String image) {
        this.name = name;
        switch (socialLoginType) {
            case GOOGLE: {
                this.google = email;
                break;
            }
            case NAVER: {
                this.naver = email;
                break;
            }
            case KAKAO: {
                this.kakao = email;
                break;
            }
        }
        this.image = image;
        this.active = true;
    }

    public void updateInfo(String name) {
        this.name = name;
    }

    public void updateImage(String image) {
        this.image = image;
    }

    public void setActive() {
        this.active = true;
    }

    public void withdraw() {
        this.active = false;
    }
}
