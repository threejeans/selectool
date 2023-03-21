package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class CorpBranch extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corp_branch_id")
    private Long id;

    private String name;

    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corp_id")
    private Corp corp;

    @Builder
    public CorpBranch(Long id, String name, String image, Corp corp) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.corp = corp;
    }

    public void update(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
