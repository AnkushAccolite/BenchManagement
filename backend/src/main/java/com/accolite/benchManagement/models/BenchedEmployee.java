package com.accolite.benchManagement.models;

import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Document(collection = "BenchedEmployees")
@Data
public class BenchedEmployee {
    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    @NonNull
    private String empId;

    private String doj;

    private String baseLocation;

    private String client;

    private Integer ageing;

    private String benchedOn;

    // List of skills associated with the benched employee
    @DBRef
    private List<Skill> skills;

    public BenchedEmployee(String name, @NonNull String empId, String doj, String baseLocation, String client, Integer ageing, String benchedOn, List<Skill> skills) {
        this.name = name;
        this.empId = empId;
        this.doj = doj;
        this.baseLocation = baseLocation;
        this.client = client;
        this.ageing = ageing;
        this.benchedOn = benchedOn;
        this.skills = skills;
    }

    @PostConstruct
    public void calculateAgeing() {
        if (benchedOn != null && !benchedOn.isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDate benchedDate = LocalDate.parse(benchedOn, formatter);
            LocalDate currentDate = LocalDate.now();

            // Calculate the difference in days
            this.ageing = (int) ChronoUnit.DAYS.between(benchedDate, currentDate);
        } else {
            this.ageing = 0;  // Default if benchedOn is not provided
        }
    }
}
