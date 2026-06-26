package com.jobportal.service;

import com.jobportal.entity.Job;
import com.jobportal.entity.Resume;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;

    private final RedisTemplate<String,Object>
            redisTemplate;

    public List<Job> recommendJobs(
            Long userId){

        String key =
                "recommend:" + userId;

        Object cached =
                redisTemplate
                        .opsForValue()
                        .get(key);

        if(cached != null){

            System.out.println(
                    "RECOMMEND REDIS HIT");

            return (List<Job>) cached;
        }

        System.out.println(
                "RECOMMEND DB HIT");

        Resume resume =
                resumeRepository
                        .findByUserId(userId)
                        .orElseThrow();

        String text =
                resume.getExtractedText()
                        .toLowerCase();

        List<Job> jobs =
                jobRepository.findAll();

        List<Job> recommended =
                new ArrayList<>();

        for(Job job : jobs){

            String desc =
                    job.getDescription()
                            .toLowerCase();

            if(
                    (text.contains("java")
                            && desc.contains("java"))
                            ||
                            (text.contains("spring")
                                    && desc.contains("spring"))
                            ||
                            (text.contains("mysql")
                                    && desc.contains("mysql"))
            ){

                recommended.add(job);
            }
        }

        redisTemplate
                .opsForValue()
                .set(
                        key,
                        recommended
                );

        return recommended;
    }
}