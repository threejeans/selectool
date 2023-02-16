package com.selectool.exception;

public class DuplicateException extends RuntimeException {
    //public static final String TEST_DUPLICATED = "이미 존재하는 ㅇㅇ입니다.";

    public DuplicateException(String message) {
        super(message);
    }
}
