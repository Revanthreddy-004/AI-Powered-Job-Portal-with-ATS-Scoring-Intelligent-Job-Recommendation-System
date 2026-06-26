package com.jobportal.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(
            topics = "resume-uploaded",
            groupId = "jobportal-group"
    )
    public void consume(
            String message){

        System.out.println(
                "KAFKA CONSUMER -> "
                        + message);
    }
}