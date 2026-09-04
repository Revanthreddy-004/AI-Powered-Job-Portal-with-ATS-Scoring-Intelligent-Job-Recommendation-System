package com.jobportal.controller;
import jakarta.validation.Valid;
import com.jobportal.dto.JobRequest;
import com.jobportal.entity.Job;
import com.jobportal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    public Job createJob(
            @Valid
            @RequestBody JobRequest request,
            @RequestParam Long recruiterId) {

        return jobService.createJob(
                request,
                recruiterId);
    }

    @GetMapping
    public List<Job> getAllJobs(){

        return jobService.getAllJobs();
    }
    @GetMapping("/filter")
    public List<Job> filterJobs(

            @RequestParam String location,

            @RequestParam Integer experience,

            @RequestParam Double salary){

        return jobService.searchJobs(
                location,
                experience,
                salary);
    }
    @GetMapping("/search/location")
    public List<Job> searchByLocation(
            @RequestParam String location){

        return jobService
                .searchByLocation(location);
    }
    @GetMapping("/search/salary")
    public List<Job> searchBySalary(
            @RequestParam Double salary){

        return jobService
                .searchBySalary(salary);
    }
    @GetMapping("/search/experience")
    public List<Job> searchByExperience(
            @RequestParam Integer experience){

        return jobService
                .searchByExperience(experience);
    }



    @GetMapping("/{id}")
    public Job getJobById(
            @PathVariable Long id){

        return jobService.getJobById(id);
    }
    @GetMapping("/page")
    public Page<Job> getJobsPage(

            @RequestParam int page,

            @RequestParam int size){

        return jobService.getJobsPage(
                page,
                size);
    }
    @PutMapping("/{id}")
    public Job updateJob(
            @PathVariable Long id,
            @Valid
            @RequestBody JobRequest request){

        return jobService.updateJob(id, request);
    }
    @DeleteMapping("/{id}")
    public String deleteJob(
            @PathVariable Long id){

        return jobService.deleteJob(id);
    }
    @GetMapping("/recruiter/{recruiterId}")
    public List<Job> getJobsByRecruiter(
            @PathVariable Long recruiterId) {

        return jobService
                .getJobsByRecruiter(recruiterId);
    }
}