package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.BenchedEmployee;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BenchedEmployeeRepository extends MongoRepository<BenchedEmployee, String> {
    Optional<BenchedEmployee> findByEmpId(String empId);
}
