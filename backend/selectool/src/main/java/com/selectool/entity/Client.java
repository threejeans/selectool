package com.selectool.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Client extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Long id;

    private String name;

    private String image;

    private String url;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ToolClient> toolClients = new ArrayList<>();

    @Builder
    public Client(Long id, String name, String image, String url, List<ToolClient> toolClients) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.url = url;
        this.toolClients = toolClients;
    }

    public void update(String name, String image, String url) {
        this.name = name;
        this.image = image;
        this.url = url;
    }
}
