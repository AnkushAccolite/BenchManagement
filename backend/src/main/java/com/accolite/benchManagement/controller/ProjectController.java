package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.Project;
import com.accolite.benchManagement.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable String projectId) throws Exception {
        Project project = projectRepository.findByProjectId(projectId)
                .orElseThrow(() -> new Exception("Project not found"));
        return ResponseEntity.ok(project);
    }

    @PutMapping("/update/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable String projectId, @RequestBody Project projectDetails) throws Exception {
        Project existingProject = projectRepository.findByProjectId(projectId)
                .orElseThrow(() -> new Exception("Project not found"));


        existingProject.setProjectName(projectDetails.getProjectName());
        existingProject.setClientName(projectDetails.getClientName());
        existingProject.setProjectHead(projectDetails.getProjectHead());
        existingProject.setLocation(projectDetails.getLocation());
        existingProject.setDeptHead(projectDetails.getDeptHead());
        existingProject.setDeptName(projectDetails.getDeptName());

        Project updatedProject = projectRepository.save(existingProject);
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId) throws Exception {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new Exception("Project not found"));

        projectRepository.delete(project);
        return ResponseEntity.ok().body("Project deleted successfully");
    }
}
