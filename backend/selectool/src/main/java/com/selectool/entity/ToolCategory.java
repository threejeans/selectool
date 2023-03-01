package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class ToolCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_category_id")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_id")
    private Tool tool;

    @Builder
    public ToolCategory(Long id, String name, Tool tool) {
        this.id = id;
        this.name = name;
        this.tool = tool;
    }
}
