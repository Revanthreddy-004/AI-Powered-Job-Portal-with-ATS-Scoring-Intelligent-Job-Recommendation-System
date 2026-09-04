package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String location;

    @Column(length = 1000)
    private String description;
}