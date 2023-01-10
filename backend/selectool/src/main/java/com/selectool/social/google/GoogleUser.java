package com.selectool.social.google;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GoogleUser {
    private String id;

    private String email;

    private Boolean verified_email;

    private String name;

    private String given_name;

    private String family_name;

    private String picture;

    private String locale;
}
