package com.accolite.benchManagement.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectRequirementAddDTO {

    private String projectId;

    private String clientName;

    private String skills;

    private Integer openings;
    private Integer experience;
    private String deadline;
}
