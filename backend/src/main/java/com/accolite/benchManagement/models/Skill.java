package com.accolite.benchManagement.models;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "skills")
@Data
public class Skill {
    @Id
    private String id;

    @NonNull
    private String skillName;

    public Skill(@NonNull String skillName) {
        this.skillName = skillName;
    }


}
