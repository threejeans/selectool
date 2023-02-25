package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class ToolPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_plan_id")
    private Long id;

    private String title;

    private String volume;

    private String cost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_id")
    private Tool tool;

    @Builder
    public ToolPlan(Long id, String title, String volume, String cost, Tool tool) {
        this.id = id;
        this.title = title;
        this.volume = volume;
        this.cost = cost;
        this.tool = tool;
    }
}
