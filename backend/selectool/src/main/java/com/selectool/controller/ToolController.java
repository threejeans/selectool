package com.selectool.controller;

import com.selectool.config.login.Admin;
import com.selectool.config.login.LoginAdmin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tool")
public class ToolController {
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        System.out.println("tool-test");
        return ResponseEntity.ok("Hello, Tool World!");
    }

//    @PostMapping
//    public ResponseEntity<?> createTool(
//            @LoginAdmin Admin admin
//            ) {
//
//
//
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("")
//    public
}
