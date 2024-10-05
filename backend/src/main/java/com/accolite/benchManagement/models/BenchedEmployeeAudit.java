package com.accolite.benchManagement.models;


import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "benched_audit")
@Getter
@Setter
@NoArgsConstructor
public class BenchedEmployeeAudit {
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

    private Integer experience;

//    // List of skills associated with the benched employee
//    @DBRef
//    private List<Skill> skills;

//    private Boolean isDeleted;

    private LocalDateTime revisionDate;

    private Integer no_of_revisions;
}
