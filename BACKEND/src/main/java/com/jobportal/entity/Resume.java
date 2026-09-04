package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "resumes")
@Data
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String filePath;

    @Column(length = 10000)
    private String extractedText;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}