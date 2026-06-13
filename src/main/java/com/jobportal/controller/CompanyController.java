package com.jobportal.controller;
import jakarta.validation.Valid;
import com.jobportal.dto.CompanyRequest;
import com.jobportal.entity.Company;
import com.jobportal.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    public Company createCompany(
            @Valid
            @RequestBody CompanyRequest request) {

        return companyService.createCompany(
                request);
    }

    @GetMapping
    public List<Company> getAllCompanies() {

        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public Company getCompanyById(
            @PathVariable Long id) {

        return companyService.getCompanyById(id);
    }
}