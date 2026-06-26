package com.jobportal.service;

import com.jobportal.dto.AtsResponse;
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
public class AtsService {

    private final ResumeRepository resumeRepository;

    private final JobRepository jobRepository;

    private final RedisTemplate<String,Object>
            redisTemplate;

    public AtsResponse getScore(
            Long userId,
            Long jobId){

        String key =
                "ats:"
                        + userId
                        + ":"
                        + jobId;

        Object cached =
                redisTemplate
                        .opsForValue()
                        .get(key);

        if(cached != null){

            System.out.println(
                    "ATS REDIS HIT");

            return (AtsResponse) cached;
        }

        Resume resume =
                resumeRepository
                        .findByUserId(userId)
                        .orElseThrow();

        Job job =
                jobRepository
                        .findById(jobId)
                        .orElseThrow();

        AtsResponse response =
                calculateScore(

                        resume.getExtractedText(),

                        job.getDescription()
                );

        redisTemplate
                .opsForValue()
                .set(
                        key,
                        response
                );

        System.out.println(
                "ATS DB/CALC HIT");

        return response;
    }

    public AtsResponse calculateScore(
            String resumeText,
            String jobDescription){

        String[] skills = {
                "java",
                "spring",
                "mysql",
                "docker",
                "kafka",
                "redis",
                "react",
                "sql",
                "rest api",
                "git"
        };

        List<String> matched =
                new ArrayList<>();

        List<String> missing =
                new ArrayList<>();

        for(String skill : skills){

            if(jobDescription
                    .toLowerCase()
                    .contains(skill)){

                if(resumeText
                        .toLowerCase()
                        .contains(skill)){

                    matched.add(skill);

                }else{

                    missing.add(skill);
                }
            }
        }

        int score = 0;

        if(matched.size()
                + missing.size() > 0){

            score =
                    (matched.size()*100)
                            /
                            (matched.size()
                                    + missing.size());
        }

        return new AtsResponse(
                score,
                matched,
                missing
        );
    }
}