package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.Employee;
import com.accolite.benchManagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

//    @PostMapping("")
//    public Employee testAddEmployee(){
//        Employee emp = new Employee("aaa","aaa","ss","ss","s");
//        this.employeeRepository.save(emp);
//        return emp;
//    }
}
