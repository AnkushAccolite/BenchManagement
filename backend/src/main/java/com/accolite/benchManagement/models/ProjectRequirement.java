package com.accolite.benchManagement.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "project_requirements")
public class ProjectRequirement {

    @Id
    private String id;

    private String projectId;

    private String skillId;

    private Integer openings;

    public ProjectRequirement(String projectId, String skillId, Integer openings) {
        this.projectId = projectId;
        this.skillId = skillId;
        this.openings = openings;
    }
}
