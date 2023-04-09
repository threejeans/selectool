package com.selectool.exception;

public class NotMatchException extends RuntimeException {
    //public static final String PASSWORD_NOT_MATCH = "비밀번호가 틀렸습니다.";
    public static final String AUTH_NOT_MATCH = "REFRESH TOKEN이 일치하지 않습니다.";
    public static final String ADMIN_CODE_NOT_MATCH = "관리자 코드가 일치하지 않습니다.";
    public static final String EMAIL_VERIFY_CODE_NOT_MATCH = "이메일 인증 코드가 일치하지 않습니다.";
    public static final String SUBSCRIBE_EMAIL_NOT_MATCH = "구독용 이메일 주소가 일치하지 않습니다.";

    public NotMatchException(String message) {
        super(message);
    }
}
