package com.jobportal.service;
import org.springframework.data.domain.*;
import com.jobportal.dto.JobRequest;
import com.jobportal.entity.Company;
import com.jobportal.entity.Job;
import com.jobportal.entity.User;
import com.jobportal.repository.CompanyRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    @CacheEvict(value = "jobs", allEntries = true)
    public Job createJob(
            JobRequest request,
            Long recruiterId) {

        Company company =
                companyRepository.findById(
                                request.getCompanyId())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Company Not Found"));

        User recruiter =
                userRepository.findById(recruiterId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Recruiter Not Found"));

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .salary(request.getSalary())
                .location(request.getLocation())
                .experience(request.getExperience())
                .skills(request.getSkills())
                .company(company)
                .recruiter(recruiter)
                .build();

        return jobRepository.save(job);
    }
    @Cacheable("jobs")
    public List<Job> getAllJobs(){
        System.out.println("DB HIT");
        return jobRepository.findAll();
    }

    public Job getJobById(Long id){

        return jobRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Job Not Found"));
    }
    @CacheEvict(value = "jobs", allEntries = true)
    public Job updateJob(Long id, JobRequest request){

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job Not Found"));

        Company company = companyRepository.findById(
                        request.getCompanyId())
                .orElseThrow(() ->
                        new RuntimeException("Company Not Found"));

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setExperience(request.getExperience());
        job.setSkills(request.getSkills());
        job.setCompany(company);

        return jobRepository.save(job);
    }
    public List<Job> getJobsByRecruiter(
            Long recruiterId) {

        return jobRepository
                .findByRecruiterId(recruiterId);
    }
    @CacheEvict(value = "jobs", allEntries = true)
    public String deleteJob(Long id){

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Job Not Found"));

        jobRepository.delete(job);

        return "Job Deleted Successfully";
    }
    public Page<Job> getJobsPage(
            int page,
            int size){

        Pageable pageable =
                PageRequest.of(page,size);

        return jobRepository.findAll(pageable);
    }
    public List<Job> searchByLocation(
            String location){

        return jobRepository
                .findByLocationContainingIgnoreCase(location);
    }

    public List<Job> searchByExperience(
            Integer experience){

        return jobRepository
                .findByExperience(experience);
    }

    public List<Job> searchBySalary(
            Double salary){

        return jobRepository
                .findBySalaryGreaterThanEqual(
                        salary);
    }
    public List<Job> searchJobs(
            String location,
            Integer experience,
            Double salary){

        return jobRepository
                .findByLocationAndExperienceAndSalaryGreaterThanEqual(
                        location,
                        experience,
                        salary);
    }



}