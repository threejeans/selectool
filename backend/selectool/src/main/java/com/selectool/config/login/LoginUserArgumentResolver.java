package com.selectool.config.login;

import com.selectool.exception.NotAuthorizedException;
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

import static com.selectool.exception.NotAuthorizedException.NOT_AUTHORIZED;

@Component
@RequiredArgsConstructor
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {
    @Value("${token.secret}")
    private String SecretKey;

    @Value("${token.admin_secret}")
    private String AdminSecretKey;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        //return parameter.getParameterAnnotation(LoginUser.class) != null;
        return parameter.hasParameterAnnotation(LoginUser.class);
    }

    @Override
    public User resolveArgument(MethodParameter parameter,
                                ModelAndViewContainer mavContainer,
                                NativeWebRequest webRequest,
                                WebDataBinderFactory binderFactory) throws Exception {
        String authorizationHeader = webRequest.getHeader("Authorization");
        String jwt = null;

        try {
            assert authorizationHeader != null;
            jwt = authorizationHeader.replace("Bearer%20", "").replace("Bearer ", "");
            Jwts.parser().setSigningKey(AdminSecretKey)
                    .parseClaimsJws(jwt).getBody();
            return new User(0L);
        } catch (Exception ec) {
            try {
                Claims body = Jwts.parser().setSigningKey(SecretKey)
                        .parseClaimsJws(jwt).getBody();
                return new User(Long.valueOf(String.valueOf(body.get("id"))));
            } catch (Exception e) {
                throw new NotAuthorizedException(NOT_AUTHORIZED);
            }
        }
    }
}