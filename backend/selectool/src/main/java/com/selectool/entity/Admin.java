package com.selectool.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long id;

    private String email;

    private boolean active;

    @Builder
    public Admin(Long id, String email) {
        this.id = id;
        this.email = email;
        this.active = true;
    }
}
