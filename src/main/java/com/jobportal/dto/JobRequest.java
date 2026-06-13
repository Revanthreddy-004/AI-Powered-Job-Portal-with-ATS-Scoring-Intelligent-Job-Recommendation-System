package com.jobportal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobRequest {

    @NotBlank(message = "Title Required")
    private String title;

    @NotBlank(message = "Description Required")
    private String description;

    @NotNull(message = "Salary Required")
    private Double salary;

    @NotBlank(message = "Location Required")
    private String location;

    @NotNull(message = "Experience Required")
    private Integer experience;

    @NotNull(message = "Company Id Required")
    private Long companyId;
}