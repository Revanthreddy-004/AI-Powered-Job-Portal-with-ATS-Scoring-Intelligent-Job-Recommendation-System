package com.jobportal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String,String>
            kafkaTemplate;

    public void sendResumeUploadedEvent(
            String message){

        kafkaTemplate.send(
                "resume-uploaded",
                message
        );

        System.out.println(
                "KAFKA PRODUCER -> "
                        + message);
    }
}