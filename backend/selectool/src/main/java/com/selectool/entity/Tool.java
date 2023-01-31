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
public class Tool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_id")
    private Long id;

    private String name_kr;

    private String name_en;

    private String info;

    private String msg;

    private String country;

    private String url;

    private String image;

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolFee> toolFees = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolFunction> toolFunctions = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Guide> guides = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolClient> toolClients = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolBookmark> toolBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "tool", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolTTag> toolTTags = new ArrayList<>();

    @Builder
    public Tool(Long id, String name_kr, String name_en, String info, String msg, String country, String url, String image) {
        this.id = id;
        this.name_kr = name_kr;
        this.name_en = name_en;
        this.info = info;
        this.msg = msg;
        this.country = country;
        this.url = url;
        this.image = image;
    }

    public void update(String name_kr, String name_en, String info, String msg, String country, String url, String image) {
        if (name_kr != null) this.name_kr = name_kr;
        if (name_en != null) this.name_en = name_en;
        if (info != null) this.info = info;
        if (msg != null) this.msg = msg;
        if (country != null) this.country = country;
        if (url != null) this.url = url;
        if (image != null) this.image = image;
    }
}
