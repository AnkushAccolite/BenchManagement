package com.accolite.benchManagement.models;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Random;
import java.util.stream.Collectors;

@Document(collection = "Projects")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Project {

    @Id
    private String id;

    @NonNull
    private String projectName;

    @NonNull
    private String clientName;

    private String projectHead;

    private String deptName;
    private String deptHead;

    private String location;
    private String startDate;
    private String endDate;

    private static String getShortForm(String name) {
        String[] words = name.split("\\s+");
        if (words.length > 1) {
            return Arrays.stream(words)
                    .map(word -> word.substring(0, 1).toUpperCase())
                    .collect(Collectors.joining());
        } else {
            return name.length() > 2 ? name.substring(0, 2).toUpperCase() : name.toUpperCase();
        }
    }
    public static String generateProjectId(String clientName, String projectName) {

        String clientShort = getShortForm(clientName);
        String projectShort = getShortForm(projectName);
        String datePart = new SimpleDateFormat("MMyy").format(new Date());

        String randomDigits = String.format("%04d", new Random().nextInt(10000));

        return clientShort + "-" + projectShort + "-" + datePart + "-" + randomDigits;
    }

    public Project(@NonNull String projectName, @NonNull String clientName, String projectHead, String deptName, String deptHead, String location,String endDate) {
        this.projectName = projectName;
        this.clientName = clientName;
        this.projectHead = projectHead;
        this.deptName = deptName;
        this.deptHead = deptHead;
        this.location = location;
        this.startDate = new SimpleDateFormat("dd-MM-yyyy").format(new Date());
        this.endDate = endDate;
        this.id = generateProjectId(clientName,projectName);    }
}
