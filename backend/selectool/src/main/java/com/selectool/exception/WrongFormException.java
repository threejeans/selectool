package com.selectool.exception;

public class WrongFormException extends RuntimeException {
//    public static final String SUMMARY_NOT_NULL = "'요약'은 필수값입니다.";

    public WrongFormException(String message) {
        super(message);
    }
}
