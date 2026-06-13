package com.jobportal.repository;

import com.jobportal.entity.Application;
import com.jobportal.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByCandidateId(
            Long candidateId);

    List<Application> findByJobId(
            Long jobId);

    boolean existsByCandidateIdAndJobId(
            Long candidateId,
            Long jobId);

    Long countByJobId(
            Long jobId);

    Long countByStatus(
            ApplicationStatus status);
}