package com.accolite.benchManagement.models;


import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clients")
@Data
public class Client {

    @Id
    private String clientId;

    @NonNull
    private String clientName;




}
