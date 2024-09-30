package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.BenchedEmployee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BenchedEmployeeRepository extends MongoRepository<BenchedEmployee, String> {
}
