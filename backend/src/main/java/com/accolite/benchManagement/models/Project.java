package com.accolite.benchManagement.models;


import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Random;
import java.util.stream.Collectors;

@Document(collection = "Projects")
@Data
public class Project {

    @Id
    private String projectId;

    @NonNull
    private String projectName;

    @NonNull
    private String clientName;

    private String projectHead;

    private String deptName;
    private String deptHead;

    private String location;

    private Date startdate;
    private Date enddate;

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

    public Project(@NonNull String projectName, @NonNull String clientName, String projectHead, String deptName, String deptHead, String location,Date startdate, Date enddate) {
        this.projectName = projectName;
        this.clientName = clientName;
        this.projectHead = projectHead;
        this.deptName = deptName;
        this.deptHead = deptHead;
        this.location = location;
        this.startdate=startdate;
        this.enddate=enddate;
        this.projectId = generateProjectId(this.clientName,this.projectName);
    }
}
