package com.selectool.config;

import com.selectool.config.login.LoginAdminArgumentResolver;
import com.selectool.config.login.LoginUserArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final LoginAdminArgumentResolver loginAdminArgumentResolver;

    private final LoginUserArgumentResolver loginUserArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginAdminArgumentResolver);
        resolvers.add(loginUserArgumentResolver);
    }

    //cors error
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://www.selectool.info", "https://selectool.info", "http://localhost:3000")
                //.allowedOriginPatterns("*")
                //.allowCredentials(true)
                .allowedMethods("*")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "access-token")
                .allowCredentials(true)
                .maxAge(86400L);
    }
}
