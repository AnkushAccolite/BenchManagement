package com.accolite.benchManagement.controller;


import com.accolite.benchManagement.models.Client;
import com.accolite.benchManagement.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/client")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;
    @GetMapping("/all")
    public List<Client> getAllClients(){
        return clientRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addClient(@RequestBody Client client){
        clientRepository.save(client);
        return ResponseEntity.ok().body("client added successfully");
    }

    @PutMapping("/update/{clientId}")
    public ResponseEntity<?> updateClient(@PathVariable("clientId") String clientId, @RequestBody Client client) throws Exception{
       Optional<Client> clientFetched= clientRepository.findById("clientId");
       if(clientFetched.isEmpty()){
           throw new Exception("Client not found");
       }
       clientFetched.get().setClientName(client.getClientName());

       return ResponseEntity.ok().body("Client updated successfully");

    }


}
