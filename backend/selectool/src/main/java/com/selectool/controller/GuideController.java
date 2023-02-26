package com.selectool.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/guide")
@Api(tags = "가이드")
public class GuideController {
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        System.out.println("test");
        return ResponseEntity.ok("Hello, World!");
    }
}
