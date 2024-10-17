package com.accolite.benchManagement.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SheduledInterviewAddDTO {
    private String empId;
    private String empName;
    private String openingId;
    private String projectName;
    private String skills;
    private int experience;
    private String status;
}
