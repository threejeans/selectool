package com.selectool.exception;

public class NotFoundException extends RuntimeException {
    //    public static final String FESTIVAL_NOT_FOUND = "존재하지 않는 축제입니다.";
    public static final String USER_NOT_FOUND = "존재하지 않는 유저입니다.";
    public static final String AUTH_NOT_FOUND = "존재하지 않는 REFRESH TOKEN 입니다.";
    public static final String ADMIN_NOT_FOUND = "존재하지 않는 관리자입니다.";
    public static final String ADMIN_CODE_NOT_FOUND = "코드가 만료되었습니다.";

    public static final String TOOL_NOT_FOUND = "존재하지 않는 툴입니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
