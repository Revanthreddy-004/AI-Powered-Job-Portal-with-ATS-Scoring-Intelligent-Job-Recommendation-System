package com.jobportal.controller;

import com.jobportal.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload/{userId}")
    public ResponseEntity<String> uploadResume(
            @PathVariable Long userId,
            @RequestParam("file")
            MultipartFile file)
            throws Exception {

        return ResponseEntity.ok(
                resumeService.uploadResume(
                        userId,
                        file));
    }
}