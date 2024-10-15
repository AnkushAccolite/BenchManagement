package com.accolite.benchManagement.models.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequirementDTO {
    private String id;
    private List<String> interviewScheduled;
    private List<String> selectedEmployees;
}
