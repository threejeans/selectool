package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class CorpBranch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corp_branch_id")
    private Long id;

    private String name;

    private String logo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corp_id")
    private Corp corp;

    @Builder
    public CorpBranch(Long id, String name, String logo, Corp corp) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.corp = corp;
    }
}
