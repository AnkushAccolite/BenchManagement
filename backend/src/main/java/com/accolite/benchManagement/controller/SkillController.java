package com.accolite.benchManagement.controller;

import com.accolite.benchManagement.models.Skill;
import com.accolite.benchManagement.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/skill")
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    @PostMapping
    public ResponseEntity<Skill> createSkill(@RequestBody Skill skill) {
        Skill savedSkill = skillRepository.save(skill);
        return ResponseEntity.ok(savedSkill);
    }
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillRepository.findAll();
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/{skillId}")
    public ResponseEntity<Skill> getSkillById(@PathVariable String skillId) throws Exception {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new Exception("Skill not found"));
        return ResponseEntity.ok(skill);
    }

    @PutMapping("/update/{skillId}")
    public ResponseEntity<Skill> updateSkill(@PathVariable String skillId, @RequestBody Skill skillDetails) throws Exception {
        Skill existingSkill = skillRepository.findById(skillId)
                .orElseThrow(() -> new Exception("Skill not found"));

        existingSkill.setSkillName(skillDetails.getSkillName());

        Skill updatedSkill = skillRepository.save(existingSkill);
        return ResponseEntity.ok(updatedSkill);
    }

    @DeleteMapping("/delete/{skillId}")
    public ResponseEntity<?> deleteSkill(@PathVariable String skillId) throws Exception {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new Exception("Skill not found"));

        skillRepository.delete(skill);
        return ResponseEntity.ok().body("Skill deleted successfully");
    }
}
