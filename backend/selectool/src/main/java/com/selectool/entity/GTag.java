package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class GTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "g_tag_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "g_tag", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuideGTag> guideGTags = new ArrayList<>();

    @Builder
    public GTag(Long id, String name, List<GuideGTag> guideGTags) {
        this.id = id;
        this.name = name;
        this.guideGTags = guideGTags;
    }
}
