package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.BenchedEmployee;
import com.accolite.benchManagement.repository.BenchedEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/benched-employee")
public class BenchedEmployeeController {

    @Autowired
    private BenchedEmployeeRepository benchedEmployeeRepository;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<BenchedEmployee> benchedEmployees = benchedEmployeeRepository.findAll();
        return ResponseEntity.ok().body(benchedEmployees);
    }

    @PostMapping
    public ResponseEntity<?> addBenchedEmployee(@RequestBody BenchedEmployee benchedEmployee){
        benchedEmployeeRepository.save(benchedEmployee);
        return ResponseEntity.ok().body("Benched employee added successfully");
    }

    @PutMapping("/update/{benchedEmployeeId}")
    public ResponseEntity<?> updateClient(@PathVariable("benchedEmployeeId") String benchedEmployeeId, @RequestBody BenchedEmployee benchedEmployee) throws Exception {
        BenchedEmployee existingBenchedEmployee = benchedEmployeeRepository.findById(benchedEmployeeId)
                .orElseThrow(() -> new Exception("Benched Employee not found"));


        existingBenchedEmployee.setName(benchedEmployee.getName());
        existingBenchedEmployee.setDoj(benchedEmployee.getDoj());
        existingBenchedEmployee.setBaseLocation(benchedEmployee.getBaseLocation());
        existingBenchedEmployee.setClient(benchedEmployee.getClient());
        existingBenchedEmployee.setBenchedOn(benchedEmployee.getBenchedOn());

        existingBenchedEmployee.calculateAgeing();

        benchedEmployeeRepository.save(existingBenchedEmployee);

        return ResponseEntity.ok("Client updated successfully");
    }



}
