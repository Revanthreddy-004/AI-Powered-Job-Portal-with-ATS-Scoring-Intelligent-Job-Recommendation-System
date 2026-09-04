package com.jobportal.service;

import com.jobportal.entity.*;
import com.jobportal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByCandidate(
            Long candidateId) {

        return applicationRepository
                .findByCandidateId(candidateId);
    }

    public List<Application> getApplicationsByJob(
            Long jobId) {

        return applicationRepository
                .findByJobId(jobId);
    }

    public String applyJob(
            Long candidateId,
            Long jobId) {

        User candidate =
                userRepository.findById(candidateId)
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        Job job =
                jobRepository.findById(jobId)
                        .orElseThrow(() ->
                                new RuntimeException("Job Not Found"));

        boolean alreadyApplied =
                applicationRepository
                        .existsByCandidateIdAndJobId(
                                candidateId,
                                jobId);

        if (alreadyApplied) {
            throw new RuntimeException(
                    "Already Applied");
        }

        Application application =
                Application.builder()
                        .candidate(candidate)
                        .job(job)
                        .status(ApplicationStatus.APPLIED)
                        .appliedAt(LocalDateTime.now())
                        .build();

        applicationRepository.save(application);

        return "Applied Successfully";
    }

    public Application updateStatus(
            Long applicationId,
            ApplicationStatus status) {

        Application application =
                applicationRepository
                        .findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application Not Found"));

        application.setStatus(status);

        return applicationRepository.save(application);
    }

    public Long getApplicationCount(
            Long jobId) {

        return applicationRepository
                .countByJobId(jobId);
    }

    public Long getStatusCount(
            ApplicationStatus status) {

        return applicationRepository
                .countByStatus(status);
    }
}