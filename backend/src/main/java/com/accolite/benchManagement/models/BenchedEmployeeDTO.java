package com.accolite.benchManagement.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BenchedEmployeeDTO {
    private String name;
    private String empId;
    private String doj;
    private String baseLocation;
    private String client;
    private String benchedOn;
    private String skills;
    private Integer experience;
}