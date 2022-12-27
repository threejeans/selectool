package com.selectool.exception;

public class BadRequestException extends RuntimeException {
    public static final String INTERNAL_SERVICE_BAD_REQUEST = "내부 서비스간 통신 오류";
    public BadRequestException(String message) {
        super(message);
    }
}
