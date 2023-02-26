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
@Getter
public class Corp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corp_id")
    private Long id;

    private String nameKr;

    private String nameEn;

    private String info;

    private String teamNameKr;

    private String teamNameEn;

    private String category;

    private String image;

    private String url;

    private String content;


    @OneToMany(mappedBy = "corp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpBranch> corpBranches = new ArrayList<>();

    @OneToMany(mappedBy = "corp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpCulture> corpCultures = new ArrayList<>();

    @OneToMany(mappedBy = "corp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpBookmark> corpBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "corp", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpTool> corpTools = new ArrayList<>();

    @Builder
    public Corp(Long id, String nameKr, String nameEn, String info, String teamNameKr, String teamNameEn, String category, String image, String url, String content, List<CorpBranch> corpBranches, List<CorpCulture> corpCultures, List<CorpBookmark> corpBookmarks, List<CorpTool> corpTools) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.teamNameKr = teamNameKr;
        this.teamNameEn = teamNameEn;
        this.category = category;
        this.image = image;
        this.url = url;
        this.content = content;
        this.corpBranches = corpBranches;
        this.corpCultures = corpCultures;
        this.corpBookmarks = corpBookmarks;
        this.corpTools = corpTools;
    }
}
