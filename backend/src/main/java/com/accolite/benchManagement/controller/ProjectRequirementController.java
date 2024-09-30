package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.ProjectRequirement;
import com.accolite.benchManagement.repository.ProjectRequirementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project-requirement")
public class ProjectRequirementController {

    @Autowired
    private ProjectRequirementRepository projectRequirementRepository;

    @PostMapping
    public ResponseEntity<ProjectRequirement> createProjectRequirement(@RequestBody ProjectRequirement projectRequirement) {
        ProjectRequirement savedRequirement = projectRequirementRepository.save(projectRequirement);
        return ResponseEntity.ok(savedRequirement);
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

    @PutMapping("/update/{id}")
    public ResponseEntity<ProjectRequirement> updateProjectRequirement(@PathVariable String id, @RequestBody ProjectRequirement requirementDetails) throws Exception {
        ProjectRequirement existingRequirement = projectRequirementRepository.findById(id)
                .orElseThrow(() -> new Exception("Project Requirement not found"));

        existingRequirement.setProjectId(requirementDetails.getProjectId());
        existingRequirement.setSkillId(requirementDetails.getSkillId());
        existingRequirement.setOpenings(requirementDetails.getOpenings());

        ProjectRequirement updatedRequirement = projectRequirementRepository.save(existingRequirement);
        return ResponseEntity.ok(updatedRequirement);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProjectRequirement(@PathVariable String id) throws Exception {
        ProjectRequirement requirement = projectRequirementRepository.findById(id)
                .orElseThrow(() -> new Exception("Project Requirement not found"));

        projectRequirementRepository.delete(requirement);
        return ResponseEntity.ok().body("Project Requirement deleted successfully");
    }
}
