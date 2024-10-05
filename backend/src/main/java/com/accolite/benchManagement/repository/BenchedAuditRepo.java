package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.BenchedEmployeeAudit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BenchedAuditRepo extends MongoRepository<BenchedEmployeeAudit,String> {
     Optional<BenchedEmployeeAudit> findByEmpId(String empId);
}
