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
public class Demand extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "demand_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String content;

    private String type;

    private Boolean status;


    @Builder
    public Demand(Long id, User user, String content, String type, Boolean status) {
        this.id = id;
        this.user = user;
        this.content = content;
        this.type = type;
        this.status = status;
    }

    public void update(Boolean status) {
        this.status = status;
    }
}
