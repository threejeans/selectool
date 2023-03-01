package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ToolPlan extends BaseEntity {
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

    @OneToMany(mappedBy = "toolPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolPlanFunction> toolPlanFunctions = new ArrayList<>();

    @Builder
    public ToolPlan(Long id, String title, String volume, String cost, Tool tool, List<ToolPlanFunction> toolPlanFunctions) {
        this.id = id;
        this.title = title;
        this.volume = volume;
        this.cost = cost;
        this.tool = tool;
        this.toolPlanFunctions = toolPlanFunctions;
    }
}
