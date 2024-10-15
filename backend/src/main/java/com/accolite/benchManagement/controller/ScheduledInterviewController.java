package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.ScheduledInterview;
import com.accolite.benchManagement.models.DTO.SheduledInterviewAddDTO;
import com.accolite.benchManagement.service.FileRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scheduledInterviews")
public class ScheduledInterviewController {

    private final FileRepository<ScheduledInterview> interviewRepository;
    String path = "src/main/resources/data/";

    public ScheduledInterviewController() {
        this.interviewRepository = new FileRepository<>(path+"scheduled_interviews.json", new TypeReference<List<ScheduledInterview>>(){});
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
        interviews.stream()
                .filter(interview -> interview.getEmpId().equals(empId) && interview.getOpeningId().equals(openingId))
                .findFirst()
                .ifPresent(interview -> {
                    interview.setStatus(status);
                    interviewRepository.update(interview);
                });
    }
}
