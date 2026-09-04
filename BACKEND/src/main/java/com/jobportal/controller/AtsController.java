package com.jobportal.controller;

import com.jobportal.dto.AtsResponse;
import com.jobportal.service.AtsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ats")
@RequiredArgsConstructor
public class AtsController {

    private final AtsService atsService;

    @GetMapping("/job/{jobId}/user/{userId}")
    public AtsResponse getScore(

            @PathVariable Long jobId,

            @PathVariable Long userId){

        return atsService.getScore(
                userId,
                jobId);
    }
}