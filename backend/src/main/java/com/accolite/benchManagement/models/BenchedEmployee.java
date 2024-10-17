
package com.accolite.benchManagement.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Document(collection = "BenchedEmployees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BenchedEmployee implements Serializable {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    @NonNull
    private String empId;

    private String doj;  // Date of joining (format: dd-MM-yyyy)

    private String baseLocation;

    private Status status = Status.UNDER_EVALUATION;

    private String client;

    private String benchedOn;  // Date in "dd-MM-yyyy" format

    private Integer experience;

    private Integer ageing;

    private String skills;

    private Boolean isDeleted = false;


    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy");


        public BenchedEmployee(String name, @NonNull String empId, String doj, String baseLocation,String benchedOn,Integer experience,String skills ) {
        this.name = name;
        this.empId = empId;
        this.doj = doj;
        this.baseLocation = baseLocation;
        this.benchedOn = benchedOn;
        this.experience=experience;
        this.isDeleted=false;
        this.client="Not Assigned";
        this.skills=skills;
        this.id = UUID.randomUUID().toString();
    }
    public Integer getAgeing() {
        if (benchedOn != null && !benchedOn.isEmpty()) {
            try {

                String trimmedBenchedOn = benchedOn.trim();


                LocalDate benchedDate = LocalDate.parse(trimmedBenchedOn, FORMATTER);
                LocalDate currentDate = LocalDate.now();


                return (int) ChronoUnit.DAYS.between(benchedDate, currentDate);
            } catch (Exception e) {
                System.err.println("Error parsing benchedOn date: " + e.getMessage());
                return 0;
            }
        } else {
            return 0;
        }
    }
}
