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

    private final RedisTemplate<String, Object> redisTemplate;


    public List<Job> recommendJobs(Long userId) {

        String key = "recommend:" + userId;


        // =========================
        // CHECK REDIS CACHE
        // =========================

        Object cached = redisTemplate
                .opsForValue()
                .get(key);

        if (cached != null) {

            System.out.println("RECOMMEND REDIS HIT");

            String cachedIds = cached.toString();

            if (!cachedIds.isBlank()) {

                List<Long> jobIds = new ArrayList<>();

                String[] ids = cachedIds.split(",");

                for (String id : ids) {

                    try {

                        jobIds.add(
                                Long.parseLong(id.trim())
                        );

                    } catch (NumberFormatException e) {

                        System.out.println(
                                "Invalid cached job ID: " + id
                        );
                    }
                }

                if (!jobIds.isEmpty()) {

                    return jobRepository.findAllById(jobIds);
                }
            }

            return new ArrayList<>();
        }


        // =========================
        // DATABASE
        // =========================

        System.out.println("RECOMMEND DB HIT");

        Resume resume = resumeRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found")
                );


        String text = resume.getExtractedText();

        if (text == null || text.isBlank()) {

            return new ArrayList<>();
        }

        text = text.toLowerCase();


        List<Job> jobs =
                jobRepository.findAll();

        List<Job> recommended =
                new ArrayList<>();


        // =========================
        // RECOMMENDATION LOGIC
        // =========================

        for (Job job : jobs) {

            String description =
                    job.getDescription();

            if (description == null) {
                continue;
            }

            String desc =
                    description.toLowerCase();


            if (
                    (text.contains("java")
                            && desc.contains("java"))

                            ||

                            (text.contains("spring")
                                    && desc.contains("spring"))

                            ||

                            (text.contains("mysql")
                                    && desc.contains("mysql"))
            ) {

                recommended.add(job);
            }
        }


        // =========================
        // CACHE JOB IDS
        // =========================

        String jobIds = recommended
                .stream()
                .map(job -> String.valueOf(job.getId()))
                .reduce(
                        (a, b) -> a + "," + b
                )
                .orElse("");


        redisTemplate
                .opsForValue()
                .set(key, jobIds);


        return recommended;
    }
}