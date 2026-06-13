package com.jobportal.service;

import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @InjectMocks
    private JobService jobService;

    @Test
    void shouldReturnAllJobs() {

        Job job = new Job();

        when(jobRepository.findAll())
                .thenReturn(List.of(job));

        List<Job> jobs =
                jobService.getAllJobs();

        assertEquals(1, jobs.size());

        verify(jobRepository)
                .findAll();
    }
}