package com.jobportal.controller;

import com.jobportal.entity.Job;
import com.jobportal.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/{userId}")
    public List<Job> recommendJobs(
            @PathVariable Long userId){

        return recommendationService
                .recommendJobs(userId);
    }
}