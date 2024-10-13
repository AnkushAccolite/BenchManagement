package com.accolite.benchManagement.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BenchedEmployee2DTO {
    private String name;
    private String empId;
    private String doj;
    private String baseLocation;
    private String benchedOn;
    private Integer experience;
    private Boolean isDeleted;
    private String status;
}