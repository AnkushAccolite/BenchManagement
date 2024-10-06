package com.accolite.benchManagement.repository;

import com.accolite.benchManagement.models.BenchedEmployeeAudit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BenchedAuditRepo extends MongoRepository<BenchedEmployeeAudit,String> {
     Optional<BenchedEmployeeAudit> findByEmpId(String empId);
     @Query("SELECT b FROM BenchedEmployeeAudit b WHERE b.empId = :empId ORDER BY b.revisionDate DESC")
     Optional<BenchedEmployeeAudit> findLatestByEmpId(@Param("empId") String empId);

}
