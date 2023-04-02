package com.selectool.entity;

import com.selectool.config.Constant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.util.StringUtils.hasText;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String name;

    private String type;

    private String email;

    private String subscribeEmail;

    private String image;

    private boolean active;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolBookmark> toolBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolSubscribe> toolSubscribes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpBookmark> corpBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuideBookmark> guideBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Demand> demands  = new ArrayList<>();

    @Builder
    public User(String name, String type, String email, String image) {
        this.name = name;
        this.type = type;
        this.email = email;
        this.image = image;
        this.active = true;
    }

    public void updateInfo(String name, String subscribeEmail, String image) {
        if (hasText(name)) this.name = name;
        if (hasText(subscribeEmail)) this.subscribeEmail = subscribeEmail;
        if (hasText(image)) this.image = image;
    }

    public void setActive() {
        this.active = true;
    }

    public void withdraw() {
        this.active = false;
    }
}
