package com.selectool.controller;

import com.selectool.config.login.Admin;
import com.selectool.config.login.LoginAdmin;
import com.selectool.config.login.LoginUser;
import com.selectool.config.login.User;
import com.selectool.dto.tool.filter.ToolFilter;
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
            @RequestParam(defaultValue = "") String name
    ) {
        List<ClientResponse> response = clientService.getClientList(name.trim());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/clients/{clientId}")
    @ApiOperation(value = "주요 고객 단건 조회")
    public ResponseEntity<ClientResponse> getClient(
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
    @ApiOperation(value = "전체 툴 목록 조회 및 검색")
    public ResponseEntity<List<ToolListResponse>> getToolList(
            @LoginUser User user,
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String country,
            @RequestParam(value = "category", required = false, defaultValue = "") List<String> categories,
            @RequestParam(defaultValue = "false") Boolean onlyTrial,
            @RequestParam(defaultValue = "name") String orderTarget
    ) {
        ToolFilter filter = ToolFilter.builder()
                .name(name.trim())
                .country(country.trim())
                .categories(categories)
                .onlyTrial(onlyTrial)
                .orderTarget(orderTarget)
                .build();
        List<ToolListResponse> response = toolService.getToolList(user.getId(), filter);
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

    @PutMapping("/tools/{toolId}")
    @ApiOperation(value = "툴 수정")
    public ResponseEntity<ToolResponse> updateTool(
            @LoginAdmin Admin admin,
            @PathVariable Long toolId,
            @RequestBody ToolCreateRequest request
    ) {
        ToolResponse response = toolService.updateTool(toolId, request);
        return ResponseEntity.ok(response);
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

    @PostMapping("/tools/{toolId}/bookmarks")
    @ApiOperation(value = "툴 북마크에 등록")
    public ResponseEntity<?> addBookmarkTool(
            @LoginUser User user,
            @PathVariable Long toolId
    ) {
        toolService.addBookmark(user.getId(), toolId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/tools/{toolId}/bookmarks")
    @ApiOperation(value = "툴 북마크 해제")
    public ResponseEntity<?> unBookmarkTool(
            @LoginUser User user,
            @PathVariable Long toolId
    ) {
        toolService.unBookmark(user.getId(), toolId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/tools/{toolId}/subscribes")
    @ApiOperation(value = "툴 구독")
    public ResponseEntity<?> addSubscribeTool(
            @LoginUser User user,
            @PathVariable Long toolId
    ) {
        toolService.addSubscribe(user.getId(), toolId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/tools/{toolId}/subscribes")
    @ApiOperation(value = "툴 구독 해제")
    public ResponseEntity<?> unSubscribeTool(
            @LoginUser User user,
            @PathVariable Long toolId
    ) {
        toolService.unSubscribe(user.getId(), toolId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tools/users/subscribes")
    @ApiOperation(value = "구독중인 툴 목록")
    public ResponseEntity<?> getSubscribeToolList(
            @LoginUser User user
    ) {
//        toolService.addSubscribe(user.getId(), toolId);
        return ResponseEntity.ok().build();
    }

    /* 비 로그인 유저 조회 */
    @GetMapping("nomember/tools")
    @ApiOperation(value = "비 로그인 전체 툴 목록 조회 및 검색", tags = "비 로그인 조회")
    public ResponseEntity<List<ToolListResponse>> getNoMemberToolList(
            @RequestParam(defaultValue = "") String name,
            @RequestParam(defaultValue = "") String country,
            @RequestParam(value = "category", required = false, defaultValue = "") List<String> categories,
            @RequestParam(defaultValue = "false") Boolean onlyTrial,
            @RequestParam(defaultValue = "name") String orderTarget
    ) {
        ToolFilter filter = ToolFilter.builder()
                .name(name.trim())
                .country(country.trim())
                .categories(categories)
                .onlyTrial(onlyTrial)
                .orderTarget(orderTarget)
                .build();
        List<ToolListResponse> response = toolService.getToolList(0L, filter);
        return ResponseEntity.ok(response);
    }

    @GetMapping("nomember/tools/{toolId}")
    @ApiOperation(value = "비 로그인 툴 단건 상세 조회", tags = "비 로그인 조회")
    public ResponseEntity<ToolResponse> getNoMemberTool(
            @PathVariable Long toolId
    ) {
        ToolResponse response = toolService.getTool(0L, toolId);
        return ResponseEntity.ok(response);
    }
}
