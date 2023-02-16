package com.selectool.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Corp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corp_id")
    private Long id;

    private String name;

    private String brand;

    private String info;

    private String homepage;

    private String blog;

    private boolean content;

    private String image;

    @OneToMany(mappedBy = "corp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpBranch> corpBranches = new ArrayList<>();

    @OneToMany(mappedBy = "corp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpCulture> corpCultures = new ArrayList<>();

    @OneToMany(mappedBy = "corp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpBookmark> corpBookmarks = new ArrayList<>();

    @Builder
    public Corp(Long id, String name, String brand, String info, String homepage, String blog, boolean content, String image) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.info = info;
        this.homepage = homepage;
        this.blog = blog;
        this.content = content;
        this.image = image;
    }
}
