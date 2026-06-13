package com.jobportal.dto;

import com.jobportal.entity.ApplicationStatus;
import lombok.Data;

@Data
public class StatusRequest {

    private ApplicationStatus status;
}