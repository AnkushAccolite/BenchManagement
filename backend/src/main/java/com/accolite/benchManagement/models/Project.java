package com.accolite.benchManagement.models;


import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Projects")
@Data
public class Project {

    @Id
    private String projectId;

    @NonNull
    private String projectName;

    @NonNull
    private String clientName;

    public Project(@NonNull String projectName, @NonNull String clientName) {
        this.projectName = projectName;
        this.clientName = clientName;
    }
}
