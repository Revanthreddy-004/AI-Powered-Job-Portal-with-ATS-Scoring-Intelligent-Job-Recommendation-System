package com.jobportal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CompanyRequest {

    @NotBlank(message = "Company Name Required")
    private String companyName;

    @NotBlank(message = "Location Required")
    private String location;

    @NotBlank(message = "Description Required")
    private String description;
}