package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.ProjectRequirement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRequirementRepository extends MongoRepository<ProjectRequirement,String> {
}

