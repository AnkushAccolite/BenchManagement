package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SkillRepository extends MongoRepository<Skill,String> {
    Optional<Skill> findBySkillName(String skillName);
}
