package com.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class AtsResponse implements Serializable {

    private int score;

    private List<String> matchedSkills;

    private List<String> missingSkills;
}