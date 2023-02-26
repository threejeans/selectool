package com.selectool.controller;

import com.selectool.config.login.Admin;
import com.selectool.config.login.LoginAdmin;
import com.selectool.config.login.LoginUser;
import com.selectool.config.login.User;
import com.selectool.dto.tool.request.ClientCreateRequest;
import com.selectool.dto.tool.request.ToolCreateRequest;
import com.selectool.dto.tool.response.ClientResponse;
import com.selectool.dto.tool.response.ToolListResponse;
import com.selectool.dto.tool.response.ToolResponse;
import com.selectool.service.ClientService;
import com.selectool.service.ToolService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/self")
@Api(tags = "혼자 써요")
public class ToolController {
    private final ToolService toolService;
    private final ClientService clientService;

    @GetMapping("/clients")
    @ApiOperation(value = "이름으로 주요 고객 검색(name 을 보내지 않을 경우 전체 목록)")
    public ResponseEntity<List<ClientResponse>> getClientList(
            @LoginAdmin User user,
            @RequestParam(defaultValue = "") String name
    ) {
        List<ClientResponse> response = clientService.getClientList(name.trim());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/clients/{clientId}")
    @ApiOperation(value = "주요 고객 단건 조회")
    public ResponseEntity<ClientResponse> getClient(
            @LoginAdmin User user,
            @PathVariable Long clientId
    ) {
        System.out.println(clientId);
        ClientResponse response = clientService.getClient(clientId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/clients")
    @ApiOperation(value = "주요 고객 등록")
    public ResponseEntity<ClientResponse> createClient(
            @LoginAdmin Admin admin,
            @RequestBody ClientCreateRequest request
    ) {
        ClientResponse response = clientService.createClient(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/clients/{clientId}")
    @ApiOperation(value = "주요 고객 삭제")
    public ResponseEntity<?> deleteClient(
            @LoginAdmin Admin admin,
            @PathVariable Long clientId
    ) {
        clientService.deleteClient(clientId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/tools")
    @ApiOperation(value = "전체 툴 목록 조회")
    public ResponseEntity<List<ToolListResponse>> getToolList(
            @LoginUser User user
    ) {
        List<ToolListResponse> response = toolService.getToolList(user.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tools/{toolId}")
    @ApiOperation(value = "툴 단건 상세 조회")
    public ResponseEntity<ToolResponse> getTool(
            @LoginUser User user,
            @PathVariable Long toolId
    ) {
        ToolResponse response = toolService.getTool(user.getId(), toolId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/tools")
    @ApiOperation(value = "툴 생성")
    public ResponseEntity<ToolResponse> createTool(
            @LoginAdmin Admin admin,
            @RequestBody ToolCreateRequest request
    ) {
        ToolResponse response = toolService.createTool(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/tools/{toolId}")
    @ApiOperation(value = "툴 삭제")
    public ResponseEntity<?> deleteTool(
            @LoginAdmin Admin admin,
            @PathVariable Long toolId
    ) {
        toolService.deleteTool(toolId);
        return ResponseEntity.ok().build();
    }
}
