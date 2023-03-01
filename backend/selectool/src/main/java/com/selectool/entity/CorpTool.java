package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class CorpTool extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corp_tool_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corp_id")
    private Corp corp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_id")
    private Tool tool;

    @Builder
    public CorpTool(Long id, Corp corp, Tool tool) {
        this.id = id;
        this.corp = corp;
        this.tool = tool;
    }
}
