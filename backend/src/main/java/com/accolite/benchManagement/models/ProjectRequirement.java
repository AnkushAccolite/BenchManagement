package com.accolite.benchManagement.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "project_requirements")
public class ProjectRequirement {

    @Id
    private String id;

    private String projectId;

    private String clientName;

    private String skills;

    private Integer openings;

    private List<String> interviewScheduled = new ArrayList<>();
    private List<String> selectedEmployees = new ArrayList<>();



    public ProjectRequirement(String projectId, String skills,String clientName, Integer openings) {
        this.projectId = projectId;
        this.skills = skills;
        this.clientName = clientName;
        this.openings = openings;
        this.id = generateId(projectId);
    }

    private String generateId(String projectId) {
        String[] parts = projectId.split("-");
        if (parts.length >= 3) {
            String projectShort = parts[1] + "-" + parts[2];
            long uniqueNumber = System.currentTimeMillis() % 10000;
            return projectShort + "-" + uniqueNumber;
        } else {
            throw new IllegalArgumentException("Invalid projectId format");
        }
    }
}
