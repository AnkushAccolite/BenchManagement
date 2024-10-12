//package com.accolite.benchManagement.controller;
//
//import com.accolite.benchManagement.models.Project;
//import com.accolite.benchManagement.repository.ProjectRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//@RestController
//@RequestMapping("/project")
//public class ProjectController {
//
//    @Autowired
//    private ProjectRepository projectRepository;
//
//    @PostMapping
//    public ResponseEntity<Project> createProject(@RequestBody Project project) {
//        Project savedProject = projectRepository.save(project);
//        return ResponseEntity.ok(savedProject);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Project>> getAllProjects() {
//        List<Project> projects = projectRepository.findAll();
//        return ResponseEntity.ok(projects);
//    }
//
//    @GetMapping("/{projectId}")
//    public ResponseEntity<Project> getProjectById(@PathVariable String projectId) throws Exception {
//        Project project = projectRepository.findByProjectId(projectId)
//                .orElseThrow(() -> new Exception("Project not found"));
//        return ResponseEntity.ok(project);
//    }
//
//    @PutMapping("/update/{projectId}")
//    public ResponseEntity<Project> updateProject(@PathVariable String projectId, @RequestBody Project projectDetails) throws Exception {
//        Project existingProject = projectRepository.findByProjectId(projectId)
//                .orElseThrow(() -> new Exception("Project not found"));
//
//
//        existingProject.setProjectName(projectDetails.getProjectName());
//        existingProject.setClientName(projectDetails.getClientName());
//        existingProject.setProjectHead(projectDetails.getProjectHead());
//        existingProject.setLocation(projectDetails.getLocation());
//        existingProject.setDeptHead(projectDetails.getDeptHead());
//        existingProject.setDeptName(projectDetails.getDeptName());
//
//        Project updatedProject = projectRepository.save(existingProject);
//        return ResponseEntity.ok(updatedProject);
//    }
//
//    @DeleteMapping("/delete/{projectId}")
//    public ResponseEntity<?> deleteProject(@PathVariable String projectId) throws Exception {
//        Project project = projectRepository.findById(projectId)
//                .orElseThrow(() -> new Exception("Project not found"));
//
//        projectRepository.delete(project);
//        return ResponseEntity.ok().body("Project deleted successfully");
//    }
//}
package com.accolite.benchManagement.controller;


import com.accolite.benchManagement.models.Project;
import com.accolite.benchManagement.models.ProjectAddDTO;
import com.accolite.benchManagement.service.FileRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private final FileRepository<Project> projectRepository;


    String path = "src/main/resources/data/";

    public ProjectController() {
        this.projectRepository = new FileRepository<>(path+"projects.json", new TypeReference<List<Project>>() {});
    }

    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectAddDTO project) {
        Project newProject = new Project(project.getProjectName(),project.getClientName(),project.getProjectHead(),project.getDeptName(),project.getDeptHead(),project.getLocation(),project.getEndDate());
        projectRepository.save(newProject);
        return ResponseEntity.ok().body("Project employee added successfully");
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable String projectId) throws Exception {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new Exception("Project not found"));
        return ResponseEntity.ok(project);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProject(@RequestBody Project projectDetails) throws Exception {

        Project existingProject = projectRepository.findById(projectDetails.getId())
                .orElseThrow(() -> new Exception("Project not found"));

        // Save updated project
        projectRepository.update(projectDetails);
        return ResponseEntity.ok().body("Project updated successfully");
    }

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId) throws Exception {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new Exception("Project not found"));

        projectRepository.delete(project);
        return ResponseEntity.ok().body("Project deleted successfully");
//        return ResponseEntity.ok().body(project);
    }
}
