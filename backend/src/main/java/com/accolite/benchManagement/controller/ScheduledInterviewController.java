package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.BenchedEmployee;
import com.accolite.benchManagement.models.ScheduledInterview;
import com.accolite.benchManagement.models.DTO.SheduledInterviewAddDTO;
import com.accolite.benchManagement.models.Status;
import com.accolite.benchManagement.service.FileRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scheduledInterviews")
public class ScheduledInterviewController {

    private final FileRepository<ScheduledInterview> interviewRepository;
    private final FileRepository<BenchedEmployee> benchedEmployeeRepository;
    String path = "src/main/resources/data/";

    public ScheduledInterviewController() {
        this.interviewRepository = new FileRepository<>(path+"scheduled_interviews.json", new TypeReference<List<ScheduledInterview>>(){});
        this.benchedEmployeeRepository = new FileRepository<>(path+"benched_employees.json", new TypeReference<List<BenchedEmployee>>(){});
    }

    @GetMapping
    public List<ScheduledInterview> getAllScheduledInterviews() {
        return interviewRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> scheduleInterview(@RequestBody SheduledInterviewAddDTO scheduledInterview) {
        ScheduledInterview newScheduledInterview = new ScheduledInterview(scheduledInterview.getEmpId(),scheduledInterview.getEmpName(),scheduledInterview.getOpeningId(),scheduledInterview.getProjectName(),scheduledInterview.getSkills(),scheduledInterview.getExperience(),scheduledInterview.getStatus());
        interviewRepository.save(newScheduledInterview);
        return ResponseEntity.ok(newScheduledInterview);
    }

    @PutMapping("/{empId}/status/{openingId}/{status}")
    public void updateInterviewStatus(@PathVariable String empId, @PathVariable String openingId, @PathVariable String status) {
        List<ScheduledInterview> interviews = interviewRepository.findAll();
        List<BenchedEmployee> benchedEmployees = benchedEmployeeRepository.findAll();
        interviews.stream()
                .filter(interview -> interview.getEmpId().equals(empId) && interview.getOpeningId().equals(openingId))
                .findFirst()
                .ifPresent(interview -> {
                    interview.setStatus(status);
                    interviewRepository.update(interview);
                });
        if(status.equals("approved")){
            benchedEmployees.stream()
                    .filter(emp -> emp.getEmpId().equals(empId))
                    .findFirst()
                    .ifPresent(emp -> {
                        emp.setStatus(Status.ONBOARDING_IN_PROGRESS);
                        emp.setClient(openingId);
                        benchedEmployeeRepository.update(emp);
                    });
        }
    }

    @GetMapping("/{empId}/status/{openingId}")
    public ResponseEntity<?> getInterviewStatus(@PathVariable String empId, @PathVariable String openingId) {
        List<ScheduledInterview> interviews = interviewRepository.findAll();
        return interviews.stream()
                .filter(interview -> interview.getEmpId().equals(empId) && interview.getOpeningId().equals(openingId))
                .findFirst()
                .map(interview -> ResponseEntity.ok(interview.getStatus()))
                .orElse(ResponseEntity.ok("notFound"));
    }
}
