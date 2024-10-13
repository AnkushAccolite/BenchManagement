package com.accolite.benchManagement.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "project_requirements")
public class ProjectRequirement {

    @Id
    private String id;

    private String projectId;

    private String clientName;

    private String skills;

    private Integer openings;


    private Integer experience;  // New field for experience

    private Date deadline;  // New field for deadline

    private List<String> interviewScheduled = new ArrayList<>();
    private List<String> selectedEmployees = new ArrayList<>();



    public ProjectRequirement(String projectId, String skills,String clientName, Integer openings,Integer experience,Date deadline) {
        this.projectId = projectId;
        this.skills = skills;
        this.clientName = clientName;
        this.openings = openings;
        this.experience = experience;  // Initialize experience
        this.deadline = deadline;
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
