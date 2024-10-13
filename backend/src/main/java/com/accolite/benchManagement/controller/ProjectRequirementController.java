package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.*;
import com.accolite.benchManagement.repository.BenchedEmployeeRepository;
import com.accolite.benchManagement.repository.ProjectRequirementRepository;
import com.accolite.benchManagement.service.FileRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/project-requirement")
public class ProjectRequirementController {

    private final FileRepository<ProjectRequirement> projectRequirementRepository;
//    private final FileRepository<BenchedEmployee> benchedEmployeeRepository;


    String path = "src/main/resources/data/";

    public ProjectRequirementController() {
        this.projectRequirementRepository = new FileRepository<>(path+"projectRequirement.json", new TypeReference<List<ProjectRequirement>>() {});
//        this.benchedEmployeeRepository = new FileRepository<>(path+"benched_employees.json", new TypeReference<List<BenchedEmployee>>() {});
    }


    @PostMapping
    public ResponseEntity<?> createProjectRequirement(@RequestBody ProjectRequirementAddDTO projectRequirement) {
        ProjectRequirement newProjectRequirement = new ProjectRequirement(projectRequirement.getProjectId(),projectRequirement.getSkills(),projectRequirement.getClientName(),projectRequirement.getOpenings());
        projectRequirementRepository.save(newProjectRequirement);
        return ResponseEntity.ok().body("Project requirement created successfully");
    }

    @GetMapping
    public ResponseEntity<List<ProjectRequirement>> getAllProjectRequirements() {
        List<ProjectRequirement> requirements = projectRequirementRepository.findAll();
        return ResponseEntity.ok(requirements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectRequirement> getProjectRequirementById(@PathVariable String id) throws Exception {
        ProjectRequirement requirement = projectRequirementRepository.findById(id)
                .orElseThrow(() -> new Exception("Project Requirement not found"));
        return ResponseEntity.ok(requirement);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProjectRequirement(@RequestBody ProjectRequirement requirementDetails) throws Exception {
        ProjectRequirement existingRequirement = projectRequirementRepository.findById(requirementDetails.getId())
                .orElseThrow(() -> new Exception("Project Requirement not found"));


        projectRequirementRepository.update(requirementDetails);
        return ResponseEntity.ok().body("Project requirement updated successfully");

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProjectRequirement(@PathVariable String id) throws Exception {
        ProjectRequirement requirement = projectRequirementRepository.findById(id)
                .orElseThrow(() -> new Exception("Project Requirement not found"));

        projectRequirementRepository.delete(id);
        return ResponseEntity.ok().body("Project Requirement deleted successfully");
    }

//    @PatchMapping("/schedule-interview/{id}")
//    public ResponseEntity<ProjectRequirement> scheduleInterview(@PathVariable String id, @RequestBody List<String> empIds) throws Exception {
//        ProjectRequirement existingRequirement = projectRequirementRepository.findById(id)
//                .orElseThrow(() -> new Exception("Project Requirement not found"));
//
//        List<String> candidates = existingRequirement.getInterviewScheduled();
//        candidates.addAll(empIds);
//        existingRequirement.setInterviewScheduled(candidates);
//        ProjectRequirement updatedRequirement = projectRequirementRepository.save(existingRequirement);
//        return ResponseEntity.ok(updatedRequirement);
//    }

//    @GetMapping("/summary")
//    public List<ProjectRequirementDTO> getProjectRequirementsSummary() {
//        List<ProjectRequirement> projectRequirements = projectRequirementRepository.findAll();
//        return projectRequirements.stream()
//                .map(pr -> new ProjectRequirementDTO(
//                        pr.getId(),
//                        pr.getInterviewScheduled(),
//                        pr.getSelectedEmployees()
//                ))
//                .collect(Collectors.toList());
//    }

//    @PutMapping("/onboarding-in-progress")
//    public ResponseEntity<String> updateInterviewStatus(@RequestBody List<EmployeeOnboardDTO> requests) {
//        for (EmployeeOnboardDTO request : requests) {
//            ProjectRequirement projectRequirement = projectRequirementRepository.findById(request.getId()).orElse(null);
//            BenchedEmployee benchedEmployee = benchedEmployeeRepository.findById(request.getEmpId()).orElse(null);
//
//            if (projectRequirement != null && benchedEmployee != null) {
//                List<String> interviewScheduled = projectRequirement.getInterviewScheduled();
//                if (interviewScheduled.contains(request.getEmpId()) && projectRequirement.getOpenings() > 0) {
//                    interviewScheduled.remove(request.getEmpId());
//                    projectRequirement.getSelectedEmployees().add(request.getEmpId());
//                    projectRequirement.setOpenings(projectRequirement.getOpenings() - 1);
//                    benchedEmployee.setStatus(Status.ONBOARDING_IN_PROGRESS);
//                    projectRequirementRepository.save(projectRequirement);
//                    benchedEmployeeRepository.save(benchedEmployee);
//                }
//            }
//        }
//        return new ResponseEntity<>("Status updated successfully", HttpStatus.OK);
//    }
}
