package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends MongoRepository<Project,String> {
    Optional<Project> findByProjectId(String projectId);
}
