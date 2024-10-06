//package com.accolite.benchManagement.models;
//
//import jakarta.annotation.PostConstruct;
//import lombok.Data;
//import lombok.NonNull;
//import org.springframework.data.annotation.CreatedBy;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.annotation.LastModifiedDate;
//import org.springframework.data.mongodb.core.index.Indexed;
//import org.springframework.data.mongodb.core.mapping.DBRef;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.time.temporal.ChronoUnit;
//import java.util.List;
//
//@Document(collection = "BenchedEmployees")
//@Data
//public class BenchedEmployee {
//    @Id
//    private String id;
//
//    private String name;
//
//    @Indexed(unique = true)
//    @NonNull
//    private String empId;
//
//    private String doj;
//
//    private String baseLocation;
//
//    private String client;
//
//    private Integer ageing;
//
//    private String benchedOn;
//
//    private Integer experience;
//
//    // List of skills associated with the benched employee
//    @DBRef
//    private List<Skill> skills;
//
//    private Boolean isDeleted;
//
//
//    public BenchedEmployee(String name, @NonNull String empId, String doj, String baseLocation, String client,String benchedOn,Integer experience) {
//        this.name = name;
//        this.empId = empId;
//        this.doj = doj;
//        this.baseLocation = baseLocation;
//        this.client = client;
//        this.benchedOn = benchedOn;
//        this.experience=experience;
//        this.isDeleted=false;
//    }
//
//    @PostConstruct
//    public void calculateAgeing() {
//        if (benchedOn != null && !benchedOn.isEmpty()) {
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
//            LocalDate benchedDate = LocalDate.parse(benchedOn, formatter);
//            LocalDate currentDate = LocalDate.now();
//
//            // Calculate the difference in days
//            this.ageing = (int) ChronoUnit.DAYS.between(benchedDate, currentDate);
//        } else {
//            this.ageing = 0;  // Default if benchedOn is not provided
//        }
//    }
//}
package com.accolite.benchManagement.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor // Added for deserialization
@AllArgsConstructor // All-arguments constructor for quick object initialization
public class BenchedEmployee {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    @NonNull
    private String empId;

    private String doj;  // Date of joining (format: dd-MM-yyyy)

    private String baseLocation;

    private  String status;

    private String client;

    private String benchedOn;  // Date in "dd-MM-yyyy" format

    private Integer experience;

    @DBRef
    private List<Skill> skills;

    private Boolean isDeleted = false;  // Default to false

    // Date formatter for parsing the date string
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd-MM-yyyy");


        public BenchedEmployee(String name, @NonNull String empId, String doj, String baseLocation, String client,String benchedOn,Integer experience) {
        this.name = name;
        this.empId = empId;
        this.doj = doj;
        this.baseLocation = baseLocation;
        this.client = client;
        this.benchedOn = benchedOn;
        this.experience=experience;
        this.isDeleted=false;
    }
    // Method to calculate ageing dynamically
    // Method to calculate ageing dynamically
    public Integer getAgeing() {
        if (benchedOn != null && !benchedOn.isEmpty()) {
            try {
                // Trim any extra whitespace or newlines
                String trimmedBenchedOn = benchedOn.trim();

                // Parse the trimmed date string
                LocalDate benchedDate = LocalDate.parse(trimmedBenchedOn, FORMATTER);
                LocalDate currentDate = LocalDate.now();

                // Calculate the difference in days and return it
                return (int) ChronoUnit.DAYS.between(benchedDate, currentDate);
            } catch (Exception e) {
                System.err.println("Error parsing benchedOn date: " + e.getMessage());
                return 0;  // Default to 0 if date parsing fails
            }
        } else {
            return 0;  // Default to 0 if `benchedOn` is not provided
        }
    }


    // Setter for `benchedOn`
    public void setBenchedOn(String benchedOn) {
        this.benchedOn = benchedOn;
    }
}
