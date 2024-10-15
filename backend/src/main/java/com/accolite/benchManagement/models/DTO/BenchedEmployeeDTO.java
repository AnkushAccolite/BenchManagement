package com.accolite.benchManagement.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BenchedEmployeeDTO {
    private String name;
    private String empId;
    private String doj;
    private String baseLocation;
    private String benchedOn;
    private String skills;
    private Integer experience;
}