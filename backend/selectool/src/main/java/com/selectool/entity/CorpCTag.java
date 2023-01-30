package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class CorpCTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corp_c_tag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corp_id")
    private Corp corp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "c_tag_id")
    private CTag cTag;

    @Builder
    public CorpCTag(Long id, Corp corp, com.selectool.entity.CTag cTag) {
        this.id = id;
        this.corp = corp;
        this.cTag = cTag;
    }
}
