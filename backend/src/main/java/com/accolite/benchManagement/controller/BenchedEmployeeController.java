package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.*;
import com.accolite.benchManagement.repository.BenchedAuditRepo;
import com.accolite.benchManagement.repository.BenchedEmployeeRepository;
import com.accolite.benchManagement.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/benched-employee")
public class BenchedEmployeeController {

    @Autowired
    private BenchedEmployeeRepository benchedEmployeeRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private BenchedAuditRepo benchedAuditRepo;

    @GetMapping
    public ResponseEntity<?> getAll(){

        List<BenchedEmployee> benchedEmployees = benchedEmployeeRepository.findAll().stream()
                .filter(employee -> !employee.getIsDeleted())
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(benchedEmployees);
    }

    @PostMapping
    public ResponseEntity<?> addBenchedEmployee(@RequestBody BenchedEmployeeDTO benchedEmployeeDTO){
        BenchedEmployee newBenchedEmployee = new BenchedEmployee(benchedEmployeeDTO.getName(),benchedEmployeeDTO.getEmpId(),benchedEmployeeDTO.getDoj(),benchedEmployeeDTO.getBaseLocation(),benchedEmployeeDTO.getClient(),benchedEmployeeDTO.getBenchedOn(),benchedEmployeeDTO.getExperience());
        List<Skill> tmp=new ArrayList<>();
        List<String> skills= List.of(benchedEmployeeDTO.getSkills().split(","));
        skills.forEach((skill)->{
            Optional<Skill> checkSkill= skillRepository.findBySkillName(skill);
            if(checkSkill.isPresent()){
               tmp.add(checkSkill.get());
            }
            else{
                Skill sk=new Skill(skill);
//                skillRepository.save(sk);
                tmp.add(skillRepository.save(sk));
            }
        });

        newBenchedEmployee.setSkills(tmp);

        benchedEmployeeRepository.save(newBenchedEmployee);
        return ResponseEntity.ok().body("Benched employee added successfully");
    }

    @PutMapping("/update/{benchedEmployeeId}")
    public ResponseEntity<?> updateClient(@PathVariable("benchedEmployeeId") String benchedEmployeeId, @RequestBody BenchedEmployee2DTO benchedEmployee) throws Exception {
        BenchedEmployee existingBenchedEmployee = benchedEmployeeRepository.findByEmpId(benchedEmployeeId)
                .orElseThrow(() -> new Exception("Benched Employee not found"));


        existingBenchedEmployee.setName(benchedEmployee.getName());
        existingBenchedEmployee.setDoj(benchedEmployee.getDoj());
        existingBenchedEmployee.setBaseLocation(benchedEmployee.getBaseLocation());
        existingBenchedEmployee.setClient(benchedEmployee.getClient());
        existingBenchedEmployee.setBenchedOn(benchedEmployee.getBenchedOn());
        existingBenchedEmployee.setExperience(benchedEmployee.getExperience());
        existingBenchedEmployee.getAgeing();
        existingBenchedEmployee.setStatus(benchedEmployee.getStatus());
        existingBenchedEmployee.setIsDeleted(benchedEmployee.getIsDeleted());
//        existingBenchedEmployee.setStatus(benchedEmployee.getStatus());
        benchedEmployeeRepository.save(existingBenchedEmployee);
//        Optional<BenchedEmployeeAudit> latestAuditRecord = benchedAuditRepo.findByEmpId(benchedEmployeeId);
//        int revisionCount = latestAuditRecord.map(BenchedEmployeeAudit::getNo_of_revisions).orElse(0);
//
//        // Create a new audit record with the incremented revision number
//        BenchedEmployeeAudit newAudit = new BenchedEmployeeAudit();
//        newAudit.setEmpId(benchedEmployeeId);
//        newAudit.setClient(benchedEmployee.getClient());
//        newAudit.setBenchedOn(benchedEmployee.getBenchedOn());
//        newAudit.setDoj(benchedEmployee.getDoj());
//        newAudit.setBaseLocation(benchedEmployee.getBaseLocation());
//        newAudit.setName(benchedEmployee.getName());
//        newAudit.setStatus(benchedEmployee.getStatus());
//        newAudit.setNo_of_revisions(revisionCount + 1);  // Increment the revision count
//        newAudit.setRevisionDate(LocalDateTime.now());  // Automatically records the time of the change
//        benchedAuditRepo.save(newAudit);

        Optional<BenchedEmployeeAudit> latestAuditRecord = benchedAuditRepo.findByEmpId(benchedEmployeeId);
        int revisionCount = latestAuditRecord.map(BenchedEmployeeAudit::getNo_of_revisions).orElse(0);

        // Create a new audit record with incremented revision number
        BenchedEmployeeAudit newAudit = new BenchedEmployeeAudit();
        newAudit.setEmpId(benchedEmployeeId);
        newAudit.setClient(benchedEmployee.getClient());
        newAudit.setBenchedOn(benchedEmployee.getBenchedOn());
        newAudit.setDoj(benchedEmployee.getDoj());
        newAudit.setBaseLocation(benchedEmployee.getBaseLocation());
        newAudit.setName(benchedEmployee.getName());
        newAudit.setStatus(benchedEmployee.getStatus());
        newAudit.setNo_of_revisions(revisionCount + 1);  // Increment the revision count
        newAudit.setRevisionDate(LocalDateTime.now());  // Automatically records the time of the change

        // Save the new audit record
        benchedAuditRepo.save(newAudit);


        return ResponseEntity.ok("Client updated successfully");
    }



}
