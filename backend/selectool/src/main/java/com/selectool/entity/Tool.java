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
public class Tool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_id")
    private Long id;

    private String nameKr;

    private String nameEn;

    private String info;

    private String msg;

    private String category;

    private String country;

    private String image;

    private String url;

    private String aos;

    private String ios;


    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolPlan> toolPlans = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolFunction> toolFunctions = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Guide> guides = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolClient> toolClients = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolBookmark> toolBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpTool> corpTools = new ArrayList<>();

    @Builder
    public Tool(Long id, String nameKr, String nameEn, String info, String msg, String category, String country, String image, String url, String aos, String ios, List<ToolPlan> toolPlans, List<ToolFunction> toolFunctions, List<Guide> guides, List<ToolClient> toolClients, List<ToolBookmark> toolBookmarks, List<CorpTool> corpTools) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.category = category;
        this.country = country;
        this.image = image;
        this.url = url;
        this.aos = aos;
        this.ios = ios;
        this.toolPlans = toolPlans;
        this.toolFunctions = toolFunctions;
        this.guides = guides;
        this.toolClients = toolClients;
        this.toolBookmarks = toolBookmarks;
        this.corpTools = corpTools;
    }
}
