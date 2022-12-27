package com.selectool.exception;

public class WrongAccessException extends RuntimeException {
//    public static final String WRONG_TOKEN_CODE = "잘못된 TOKEN CODE 입니다.";

    public WrongAccessException(String message) {
        super(message);
    }
}
