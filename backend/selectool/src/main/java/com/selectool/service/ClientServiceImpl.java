package com.selectool.service;

import com.selectool.dto.tool.request.ClientCreateRequest;
import com.selectool.dto.tool.response.ClientResponse;
import com.selectool.entity.Client;
import com.selectool.exception.NotFoundException;
import com.selectool.repository.ClientRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.selectool.exception.NotFoundException.TOOL_NOT_CLIENT;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ClientServiceImpl implements ClientService {
    private final ClientRepo clientRepo;

    @Override
    public List<ClientResponse> getClientList(String name) {
        List<Client> response;
        if (name.isEmpty()) response = clientRepo.findAll();
        else response = clientRepo.findByNameContaining(name);

        return response.stream()
                .map(client -> ClientResponse.builder()
                        .id(client.getId())
                        .name(client.getName())
                        .image(client.getImage())
                        .url(client.getUrl())
                        .build()
                )
                .collect(Collectors.toList());
    }

    @Override
    public ClientResponse getClient(Long clientId) {
        Client response = clientRepo.findById(clientId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_CLIENT));
        return ClientResponse.builder()
                .id(response.getId())
                .name(response.getName())
                .image(response.getImage())
                .url(response.getUrl())
                .build();
    }

    @Override
    @Transactional
    public ClientResponse createClient(ClientCreateRequest request) {
        Client client = Client.builder()
                .name(request.getName())
                .image(request.getImage())
                .url(request.getUrl())
                .build();
        clientRepo.save(client);

        return ClientResponse.builder()
                .id(client.getId())
                .name(client.getName())
                .image(client.getImage())
                .url(client.getUrl())
                .build();
    }

    @Override
    @Transactional
    public void deleteClient(Long clientId) {
        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new NotFoundException(TOOL_NOT_CLIENT));

        clientRepo.delete(client);
    }
}
