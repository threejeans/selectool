package com.selectool.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message {
    private String message;

    @Override
    public boolean equals(Object o) {
        return o instanceof Message && message.equals(((Message) o).getMessage());
    }

    @Override
    public int hashCode() {
        return Objects.hash(message);
    }
}
