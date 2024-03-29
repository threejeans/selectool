package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Guide extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guide_id")
    private Long id;

    private String title;

    private LocalDateTime date;

    private String content;

    private String source;

    private String toolName;

    private String func;

    private String url;

    private String image;

    private String toolImage;

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuideCategory> guideCategories = new ArrayList<>();

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuideBookmark> guideBookmarks = new ArrayList<>();

    @Builder
    public Guide(Long id, String title, LocalDateTime date, String content, String source, String toolName, String func, String url, String image, String toolImage, List<GuideCategory> guideCategories, List<GuideBookmark> guideBookmarks) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.content = content;
        this.source = source;
        this.toolName = toolName;
        this.func = func;
        this.url = url;
        this.image = image;
        this.toolImage = toolImage;
        this.guideCategories = guideCategories;
        this.guideBookmarks = guideBookmarks;
    }

    public void update(String title, LocalDateTime date, String content, String source, String toolName, String func, String url, String image, String toolImage, List<GuideCategory> guideCategories) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.source = source;
        this.toolName = toolName;
        this.func = func;
        this.url = url;
        this.image = image;
        this.toolImage = toolImage;
        this.guideCategories = guideCategories;
    }


}
