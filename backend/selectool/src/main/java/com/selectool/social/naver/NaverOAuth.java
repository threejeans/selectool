package com.selectool.social.naver;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.selectool.social.SocialOauth;
import com.selectool.social.google.GoogleOAuthToken;
import com.selectool.social.google.GoogleUser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class NaverOAuth implements SocialOauth {
    @Value("${spring.OAuth2.naver.client-id}")
    private String NAVER_SNS_CLIENT_ID;

    @Value("${spring.OAuth2.naver.state}")
    private String NAVER_SNS_STATE;

    @Value("${spring.OAuth2.naver.client-secret}")
    private String NAVER_SNS_CLIENT_SECRET;

    private final ObjectMapper objectMapper;

    @Override
    public ResponseEntity<String> requestAccessToken(String code) {
        String NAVER_TOKEN_REQUEST_URL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Naver-Client-Id", NAVER_SNS_CLIENT_ID);
        headers.add("X-Naver-Client-Secret", NAVER_SNS_CLIENT_SECRET);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity(headers);

        Map<String, Object> params = new HashMap<>();
        NAVER_TOKEN_REQUEST_URL += "&code=" + code;
        NAVER_TOKEN_REQUEST_URL += "&client_id=" + NAVER_SNS_CLIENT_ID;
        NAVER_TOKEN_REQUEST_URL += "&client_secret=" + NAVER_SNS_CLIENT_SECRET;
        NAVER_TOKEN_REQUEST_URL += "&state=" + NAVER_SNS_STATE;

        ResponseEntity<String> responseEntity = restTemplate.exchange(NAVER_TOKEN_REQUEST_URL, HttpMethod.GET, request, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity;
        }

        System.out.println("error");
        return null;
    }

    public NaverOAuthToken getAccessToken(ResponseEntity<String> response) throws JsonProcessingException {
        NaverOAuthToken naverOAuthToken = objectMapper.readValue(response.getBody(), NaverOAuthToken.class);
        return naverOAuthToken;
    }

    public ResponseEntity<String> requestUserInfo(NaverOAuthToken oAuthToken) {
        String NAVER_USERINFO_REQUEST_URL = "https://openapi.naver.com/v1/nid/me";
        RestTemplate restTemplate = new RestTemplate();
        //header에 accessToken을 담는다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oAuthToken.getAccess_token());

        //HttpEntity를 하나 생성해 헤더를 담아서 restTemplate으로 네이버와 통신하게 된다.
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(NAVER_USERINFO_REQUEST_URL, HttpMethod.GET, request, String.class);
        return response;
    }

    public NaverUser getUserInfo(ResponseEntity<String> userInfoRes) throws JsonProcessingException {
        NaverRes naverRes = objectMapper.readValue(userInfoRes.getBody(), NaverRes.class);
        NaverUser naverUser = naverRes.getResponse();
        return naverUser;
    }
}
