package com.selectool.config.login;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
public class LoginAdminArgumentResolver implements HandlerMethodArgumentResolver {
    @Value("${token.admin_secret}")
    private String SecretKey;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        //return parameter.getParameterAnnotation(LoginUser.class) != null;
        return parameter.hasParameterAnnotation(LoginAdmin.class);
    }

    @Override
    public Admin resolveArgument(MethodParameter parameter,
                                 ModelAndViewContainer mavContainer,
                                 NativeWebRequest webRequest,
                                 WebDataBinderFactory binderFactory) throws Exception {

        try {
            String authorizationHeader = webRequest.getHeader("Authorization");
            String jwt = authorizationHeader.replace("Bearer%20", "").replace("Bearer ", "");
            Claims body = Jwts.parser().setSigningKey(SecretKey)
                    .parseClaimsJws(jwt).getBody();
            Admin admin = new Admin(Long.valueOf(String.valueOf(body.get("id"))));
            return admin;
        } catch (ClassCastException e) {
            //throw new NotMatchException(TOKEN_NOT_MATCH);
            throw new RuntimeException("error");
        }
    }
}