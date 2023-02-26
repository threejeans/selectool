package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class ToolFee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tool_fee_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_id")
    private Tool tool;

    @Builder
    public ToolFee(Long id, Tool tool) {
        this.id = id;
        this.tool = tool;
    }
}
