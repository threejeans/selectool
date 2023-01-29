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
public class TTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "t_tag_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "t_tag", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolTTag> toolTTags = new ArrayList<>();

    @Builder
    public TTag(Long id, String name, List<ToolTTag> toolTTags) {
        this.id = id;
        this.name = name;
        this.toolTTags = toolTTags;
    }
}
