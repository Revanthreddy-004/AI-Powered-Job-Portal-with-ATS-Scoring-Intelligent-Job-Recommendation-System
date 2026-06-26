package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Job implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private Double salary;

    private String location;

    private Integer experience;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}