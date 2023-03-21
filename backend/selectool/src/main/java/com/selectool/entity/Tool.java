package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Tool extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_id")
    private Long id;

    private String nameKr;

    private String nameEn;

    private String info;

    private String msg;

    private String topic;

    private String country;

    private String image;

    private String url;

    private String aos;

    private String ios;

    @ColumnDefault("false")
    private Boolean trial;

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolCategory> toolCategories = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolPlan> toolPlans = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolFunction> toolFunctions = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolClient> toolClients = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolBookmark> toolBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<CorpTool> corpTools = new ArrayList<>();

    @Builder
    public Tool(Long id, String nameKr, String nameEn, String info, String msg, String topic, String country, String image, String url, String aos, String ios, Boolean trial, List<ToolCategory> toolCategories, List<ToolPlan> toolPlans, List<ToolFunction> toolFunctions, List<ToolClient> toolClients, List<ToolBookmark> toolBookmarks, List<CorpTool> corpTools) {
        this.id = id;
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.topic = topic;
        this.country = country;
        this.image = image;
        this.url = url;
        this.aos = aos;
        this.ios = ios;
        this.trial = trial;
        this.toolCategories = toolCategories;
        this.toolPlans = toolPlans;
        this.toolFunctions = toolFunctions;
        this.toolClients = toolClients;
        this.toolBookmarks = toolBookmarks;
        this.corpTools = corpTools;
    }

    public void update(String nameKr, String nameEn, String info, String msg, String topic, String country, String image, String url, String aos, String ios, Boolean trial, List<ToolCategory> toolCategories, List<ToolPlan> toolPlans, List<ToolFunction> toolFunctions, List<ToolClient> toolClients) {
        this.nameKr = nameKr;
        this.nameEn = nameEn;
        this.info = info;
        this.msg = msg;
        this.topic = topic;
        this.country = country;
        this.image = image;
        this.url = url;
        this.aos = aos;
        this.ios = ios;
        this.trial = trial;
        this.toolCategories = toolCategories;
        this.toolPlans = toolPlans;
        this.toolFunctions = toolFunctions;
        this.toolClients = toolClients;
    }
}
