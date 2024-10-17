package com.accolite.benchManagement.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduledInterview {
    @Id
    private String id;
    private String empId;
    private String empName;
    private String openingId;
    private String projectName;
    private String skills;
    private int experience;
    private String status;

    public ScheduledInterview(String empId, String empName, String openingId, String projectName, String skills, int experience, String status) {
        this.empId = empId;
        this.empName = empName;
        this.openingId = openingId;
        this.projectName = projectName;
        this.skills = skills;
        this.experience = experience;
        this.status = status;
        this.id = UUID.randomUUID().toString();
    }
}
