package com.selectool.exception;

public class DuplicateException extends RuntimeException {
    //public static final String TEST_DUPLICATED = "이미 존재하는 ㅇㅇ입니다.";
    public static final String TOOL_BOOKMARK_DUPLICATED = "이미 북마크에 존재하는 툴입니다.";
    public static final String GUIDE_BOOKMARK_DUPLICATED = "이미 북마크에 존재하는 가이드입니다.";
    public static final String CORP_BOOKMARK_DUPLICATED = "이미 북마크에 존재하는 기업입니다.";
    public static final String TOOL_SUBSCRIBE_DUPLICATED = "이미 구독중인 툴입니다.";

    public DuplicateException(String message) {
        super(message);
    }
}
