package com.selectool.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Guide {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guide_id")
    private Long id;

    private String url;

    private String image;

    private String title;

    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_id")
    private Tool tool;

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuideGTag> guideGTags = new ArrayList<>();

    @OneToMany(mappedBy = "guide", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuideBookmark> guideBookmarks = new ArrayList<>();

    @Builder
    public Guide(Long id, String url, String image, String title, LocalDateTime date, Tool tool) {
        this.id = id;
        this.url = url;
        this.image = image;
        this.title = title;
        this.date = date;
        this.tool = tool;
    }
}
