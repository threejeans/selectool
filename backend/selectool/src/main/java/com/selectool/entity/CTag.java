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
public class CTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "c_tag_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "c_tag", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CorpCTag> corpCTags = new ArrayList<>();

    @Builder
    public CTag(Long id, String name, List<CorpCTag> corpCTags) {
        this.id = id;
        this.name = name;
        this.corpCTags = corpCTags;
    }
}
