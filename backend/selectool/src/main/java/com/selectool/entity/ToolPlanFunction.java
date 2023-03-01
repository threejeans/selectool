package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class ToolPlanFunction extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_plan_function_id")
    private Long id;

    private String func;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_plan_id")
    private ToolPlan toolPlan;

    @Builder
    public ToolPlanFunction(Long id, String func, ToolPlan toolPlan) {
        this.id = id;
        this.func = func;
        this.toolPlan = toolPlan;
    }
}
