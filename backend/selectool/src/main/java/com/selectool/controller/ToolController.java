package com.selectool.controller;

import com.selectool.dto.tool.request.ToolCreateRequest;
import com.selectool.dto.tool.response.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@RequestMapping("/self")
@Api(tags = "혼자 써요")
public class ToolController {
    @GetMapping("/clients")
    @ApiOperation(value = "이름으로 주요 고객 검색(name 을 보내지 않을 경우 전체 목록)")
    public ResponseEntity<List<ClientResponse>> getClientList(
//            @LoginAdmin Admin admin,
            @RequestParam(defaultValue = "") String name
    ) {
        System.out.println(name.isEmpty());
        List<ClientResponse> response = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            response.add(
                    ClientResponse.builder()
                            .id((long) i)
                            .name("name " + i)
                            .image("image url " + i)
                            .url("client url " + i)
                            .build()
            );
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/clients/{clientId}")
    @ApiOperation(value = "주요 고객 단건 조회")
    public ResponseEntity<ClientResponse> getClient(
//            @LoginAdmin Admin admin,
            @PathVariable Long clientId
    ) {
        System.out.println(clientId);
        ClientResponse response = ClientResponse.builder()
                .id((long) clientId)
                .name("name " + clientId)
                .image("image url " + clientId)
                .url("client url " + clientId)
                .build();
        return ResponseEntity.ok(response);
    }


    @GetMapping("/tools")
    @ApiOperation(value = "전체 툴 목록")
    public ResponseEntity<List<ToolListResponse>> getToolList(
//            @LoginUser User user
    ) {
        Random random = new Random();
        String[] countries = {"국내", "해외"};

        List<ToolListResponse> response = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            response.add(
                    ToolListResponse.builder()
                            .id((long) i)
                            .nameKr("이름 " + i)
                            .nameEn("name " + i)
                            .info("한줄 소개 " + i)
                            .msg("호버 메시지 " + i)
                            .category("프로덕트 분류" + i)
                            .country(countries[random.nextInt(2)])
                            .image("썸네일 url " + i)
                            .isBookmarked(random.nextInt(2) == 0)
                            .build()
            );
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/tools/{toolId}")
    @ApiOperation(value = "툴 단건 상세 조회")
    public ResponseEntity<ToolResponse> getTool(
//            @LoginUser User user
            @PathVariable Long toolId
    ) {
        Random random = new Random();
        String[] countries = {"국내", "해외"};

        List<ToolFunctionResponse> toolFunctions = new ArrayList<>();
        List<ClientResponse> clients = new ArrayList<>();
        List<ToolPlanResponse> plans = new ArrayList<>();

        for (int i = 1; i <= 3; i++) {
            toolFunctions.add(
                    ToolFunctionResponse.builder()
                            .id((long)i)
                            .name("툴 핵심 기능 이름 " + i)
                            .content("툴 핵심 기능 상세 내용 " + i)
                            .build()
            );

            clients.add(
                    ClientResponse.builder()
                            .id((long)i)
                            .name("주요 고객사 이름 " + i)
                            .image("주요 고객사 썸네일 url " + i)
                            .url("주요 고객사 홈페이지 url " + i)
                            .build()
            );

            List<ToolPlanFunctionResponse> planFunctions = new ArrayList<>();
            for (int j = 3 * i - 2; j <= 3 * i; j++) {
                planFunctions.add(
                        ToolPlanFunctionResponse.builder()
                                .id((long)j)
                                .func("플랜에 해당 하는 기능 " + j)
                                .build()
                );
            }

            plans.add(
                    ToolPlanResponse.builder()
                            .id((long)i)
                            .title("툴 가격 플랜 " + i)
                            .volume("툴 N명당 사용 용량 " + i)
                            .cost("툴 N명당 가격" + i)
                            .planFunctions(planFunctions)
                            .build()
            );


        }

        ToolResponse response = ToolResponse.builder()
                .id(toolId)
                .nameKr("이름 " + toolId)
                .nameEn("name " + toolId)
                .info("한줄 소개 " + toolId)
                .msg("호버 메시지 " + toolId)
                .category("프로덕트 분류" + toolId)
                .country(countries[random.nextInt(2)])
                .image("썸네일 url " + toolId)
                .url("툴 주소 url" + toolId)
                .aos("안드로이드 평점" + toolId)
                .ios("애플 평점" + toolId)
                .toolFunctions(toolFunctions)
                .clients(clients)
                .plans(plans)
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/tools")
    @ApiOperation(value = "툴 생성")
    public ResponseEntity<?> createTool(
//            @LoginAdmin Admin admin
            @RequestBody ToolCreateRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
