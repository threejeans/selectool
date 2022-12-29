package com.selectool.exception;

public class NotAuthorizedException extends RuntimeException {
//    public static final String CREATE_NOT_AUTHORIZED = "생성 권한이 없습니다.";
    public NotAuthorizedException(String message) {
        super(message);
    }
}
