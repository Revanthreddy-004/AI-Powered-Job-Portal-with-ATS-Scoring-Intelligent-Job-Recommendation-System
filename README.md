# Job Portal - Full Stack Job Recruitment Platform

## Overview

Job Portal is a full-stack recruitment platform built using Spring Boot, Spring Security, JWT Authentication, MySQL, and Angular.

The system enables candidates to register, log in, browse jobs, search and filter opportunities, and apply for jobs. Recruiters can create job postings and manage candidate applications through a secure role-based authorization system.

---

# Tech Stack

## Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* Maven

## Frontend

* Angular 22
* TypeScript
* Angular Router
* Angular HttpClient
* Tailwind CSS

---

# Features

## Authentication & Security

* User Registration
* User Login
* JWT Token Generation
* JWT Authentication Filter
* Role-Based Authorization
* Protected REST APIs

## User Roles

### Candidate

* Register Account
* Login Account
* View Available Jobs
* Search Jobs
* Filter Jobs
* Apply For Jobs

### Recruiter

* Create Jobs
* Update Jobs
* View Applications
* Update Candidate Application Status

### Admin

* Manage Jobs
* Access Protected Resources

---

# Company Management

* Create Company
* View All Companies
* Get Company By ID

APIs:

```http
POST /api/companies

GET /api/companies

GET /api/companies/{id}
```

---

# Job Management

* Create Job
* View All Jobs
* Get Job By ID
* Update Job
* Delete Job

APIs:

```http
POST /api/jobs

GET /api/jobs

GET /api/jobs/{id}

PUT /api/jobs/{id}

DELETE /api/jobs/{id}
```

---

# Search & Filtering

### Search By Location

```http
GET /api/jobs/search/location
```

### Search By Salary

```http
GET /api/jobs/search/salary
```

### Search By Experience

```http
GET /api/jobs/search/experience
```

### Combined Filter

```http
GET /api/jobs/filter
```

Supports:

* Location
* Experience
* Minimum Salary

---

# Pagination

Paginated Job Listing:

```http
GET /api/jobs/page?page=0&size=10
```

---

# Application Management

### Apply For Job

```http
POST /api/applications/apply
```

### View Candidate Applications

```http
GET /api/applications/candidate/{candidateId}
```

### View Applications For A Job

```http
GET /api/applications/job/{jobId}
```

### View All Applications

```http
GET /api/applications
```

### Update Application Status

```http
PUT /api/applications/{applicationId}/status
```

Supported Statuses:

* APPLIED
* SHORTLISTED
* REJECTED
* HIRED

---

# Analytics & Statistics

### Count Applications For Job

```http
GET /api/applications/count/job/{jobId}
```

### Count Applications By Status

```http
GET /api/applications/count/status/{status}
```

---

# Business Rules

### Duplicate Application Prevention

A candidate cannot apply to the same job more than once.

Example Response:

```json
{
  "message": "Already Applied"
}
```

### Validation

* Request Validation using Jakarta Validation
* Global Exception Handling
* Secure Password Storage using BCrypt

---

# Database Entities

## User

* id
* name
* email
* password
* role

## Company

* id
* companyName
* location
* description

## Job

* id
* title
* description
* salary
* location
* experience
* company

## Application

* id
* status
* appliedAt
* candidate
* job

---

# Frontend Features

## Implemented

* User Registration
* User Login
* JWT Storage
* Jobs Listing Page
* Apply Job Integration
* Candidate Dashboard Structure
* Recruiter Dashboard Structure
* Angular Routing
* API Integration

---

# Testing

Unit Tests Implemented For:

* AuthService
* JobService
* ApplicationService

---

# Setup Instructions

## Database

Create MySQL database:

```sql
CREATE DATABASE job_portal;
```

Update:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/job_portal
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

---

## Run Backend

```bash
mvn spring-boot:run
```

---

## Run Frontend

```bash
npm install

ng serve
```

Application URL:

```text
http://localhost:4200
```

---

# Future Enhancements

* Resume Upload
* Advanced Search Filters
* Recruiter Analytics Dashboard
* Email Notifications
* Application Tracking UI Improvements
* Candidate Profile Management

---

# Project Status

Backend: Complete

Frontend: Authentication, Job Listing, and Job Application Integration Completed

Project Type: Full Stack Web Application
