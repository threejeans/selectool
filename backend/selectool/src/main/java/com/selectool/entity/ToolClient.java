package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class ToolClient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "corp_tool_id")
    private Long id;

    private String image;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tool_id")
    private Tool tool;

    @Builder
    public ToolClient(Long id, String image, String url, Tool tool) {
        this.id = id;
        this.image = image;
        this.url = url;
        this.tool = tool;
    }
}
