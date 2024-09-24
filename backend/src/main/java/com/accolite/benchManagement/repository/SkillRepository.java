package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends MongoRepository<Skill,String> {
}
