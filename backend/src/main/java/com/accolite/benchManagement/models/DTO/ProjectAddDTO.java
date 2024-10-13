package com.accolite.benchManagement.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectAddDTO {
    private String projectName;
    private String projectHead;
    private String clientName;
    private String deptName;
    private String deptHead;
    private String location;
    private String endDate;
}
