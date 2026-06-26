package com.jobportal.controller;

import com.jobportal.dto.StatusRequest;
import com.jobportal.entity.Application;
import com.jobportal.entity.ApplicationStatus;
import com.jobportal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public List<Application> getAllApplications() {

        return applicationService
                .getAllApplications();
    }

    @GetMapping("/candidate/{candidateId}")
    public List<Application>
    getApplicationsByCandidate(

            @PathVariable Long candidateId) {

        return applicationService
                .getApplicationsByCandidate(
                        candidateId);
    }

    @GetMapping("/job/{jobId}")
    public List<Application>
    getApplicationsByJob(

            @PathVariable Long jobId) {

        return applicationService
                .getApplicationsByJob(
                        jobId);
    }

    @PostMapping("/apply")
    public String applyJob(
            @RequestParam Long candidateId,
            @RequestParam Long jobId) {

        System.out.println("========== APPLY HIT ==========");
        System.out.println("candidateId = " + candidateId);
        System.out.println("jobId = " + jobId);

        return "TEST SUCCESS";
    }

    @PutMapping("/{applicationId}/status")
    public Application updateStatus(

            @PathVariable Long applicationId,

            @RequestBody StatusRequest request) {

        return applicationService
                .updateStatus(
                        applicationId,
                        request.getStatus());
    }

    @GetMapping("/count/job/{jobId}")
    public Long getApplicationCount(

            @PathVariable Long jobId) {

        return applicationService
                .getApplicationCount(jobId);
    }

    @GetMapping("/count/status/{status}")
    public Long getStatusCount(

            @PathVariable ApplicationStatus status) {

        return applicationService
                .getStatusCount(status);
    }
}