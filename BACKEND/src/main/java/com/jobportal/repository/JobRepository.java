package com.jobportal.repository;

import java.util.*;

import com.jobportal.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository
        extends JpaRepository<Job, Long> {

    List<Job> findByLocationContainingIgnoreCase(
            String location);

    List<Job> findByExperience(
            Integer experience);

    List<Job> findBySalaryGreaterThanEqual(
            Double salary);

    Long countByCompanyId(
            Long companyId);

    List<Job> findByRecruiterId(
            Long recruiterId);

    List<Job> findByLocationAndExperienceAndSalaryGreaterThanEqual(
            String location,
            Integer experience,
            Double salary);
}