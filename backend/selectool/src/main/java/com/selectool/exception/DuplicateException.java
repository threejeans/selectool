package com.selectool.exception;

public class DuplicateException extends RuntimeException {
    //public static final String TEST_DUPLICATED = "이미 존재하는 ㅇㅇ입니다.";
    public static final String TOOL_BOOKMARK_DUPLICATED = "이미 북마크된 존재하는 툴입니다.";

    public DuplicateException(String message) {
        super(message);
    }
}
