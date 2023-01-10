package com.selectool.exception;

public class NotMatchException extends RuntimeException {
    //public static final String PASSWORD_NOT_MATCH = "비밀번호가 틀렸습니다.";
    public static final String AUTH_NOT_MATCH = "REFRESH TOKEN이 일치하지 않습니다.";
    public NotMatchException(String message) {
        super(message);
    }
}
