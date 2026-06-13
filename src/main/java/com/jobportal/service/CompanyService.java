package com.jobportal.service;

import com.jobportal.dto.CompanyRequest;
import com.jobportal.entity.Company;
import com.jobportal.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public Company createCompany(
            CompanyRequest request) {

        Company company = Company.builder()
                .companyName(
                        request.getCompanyName())
                .location(
                        request.getLocation())
                .description(
                        request.getDescription())
                .build();

        return companyRepository.save(company);
    }

    public List<Company> getAllCompanies() {

        return companyRepository.findAll();
    }

    public Company getCompanyById(Long id) {

        return companyRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Company Not Found"));
    }
}