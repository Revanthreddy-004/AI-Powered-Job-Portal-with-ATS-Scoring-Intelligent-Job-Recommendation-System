# AI-Powered Job Portal with ATS Scoring & Intelligent Job Recommendation System

## Overview

AI-Powered Job Portal is a full-stack recruitment platform built using Spring Boot, Spring Security, JWT Authentication, Angular, MySQL, Redis, Kafka, and Docker.

The application enables candidates to register, upload resumes, receive ATS scores, and get personalized job recommendations. Recruiters can create jobs, manage applications, and update candidate statuses through a secure role-based authorization system.

---

# Tech Stack

## Backend

* Java 17
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* Redis
* Apache Kafka
* Maven

## Frontend

* Angular 22
* TypeScript
* Angular Router
* Angular HttpClient
* HTML
* CSS

## DevOps

* Docker
* Docker Compose

---

# Features

## Authentication & Security

* User Registration
* User Login
* JWT Token Generation
* JWT Authentication Filter
* Role-Based Authorization
* Protected REST APIs
* BCrypt Password Encryption

---

# User Roles

## Candidate

* Register Account
* Login Account
* Browse Jobs
* Search Jobs
* Filter Jobs
* Apply For Jobs
* Upload Resume
* View ATS Score
* View Recommended Jobs

## Recruiter

* Create Jobs
* Update Jobs
* Delete Jobs
* View Applications
* Update Application Status

## Admin

* Manage Jobs
* Access Protected Resources

---

# Company Management

* Create Company
* View All Companies
* Get Company By ID

### APIs

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

### APIs

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

```http
GET /api/jobs/page?page=0&size=10
```

---

# Resume Upload System

Features:

* PDF Resume Upload
* Resume Storage
* Resume Text Extraction
* Candidate Resume Management

### API

```http
POST /api/resume/upload
```

---

# ATS Scoring System

Features:

* Resume Skill Analysis
* Job Description Matching
* Matched Skills Detection
* Missing Skills Detection
* ATS Score Calculation

### API

```http
GET /api/ats/job/{jobId}/user/{userId}
```

---

# Intelligent Job Recommendation System

Features:

* Resume-Based Recommendations
* Skill Matching
* Personalized Job Suggestions

### API

```http
GET /api/recommend/{userId}
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

### View Applications For Job

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

# Redis Caching

Implemented caching for:

* Job Listings
* ATS Results
* Recommendation Results

Annotations Used:

* @Cacheable
* @CacheEvict

Benefits:

* Reduced Database Hits
* Faster API Responses
* Improved Application Performance

---

# Apache Kafka Integration

Kafka is used for asynchronous event processing.

### Producer

* Sends resume upload events.

### Consumer

* Receives resume upload events.

### Flow

Resume Upload

↓

Kafka Producer

↓

Kafka Topic

↓

Kafka Consumer

---

# Docker Containerization

Containerized Services:

* Spring Boot Application
* MySQL Database
* Redis Server
* Kafka Broker

Docker Technologies:

* Dockerfile
* Docker Compose

---

# Business Rules

### Duplicate Application Prevention

A candidate cannot apply to the same job more than once.

Example:

```json
{
  "message": "Already Applied"
}
```

### Validation

* Jakarta Validation
* Global Exception Handling
* BCrypt Password Encryption

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

## Resume

* id
* fileName
* filePath
* extractedText
* user

## Application

* id
* status
* appliedAt
* candidate
* job

---

# Frontend Features

Implemented:

* User Registration
* User Login
* JWT Token Storage
* Job Listing Page
* ATS Dashboard
* Recommendation Dashboard
* Candidate Dashboard
* Recruiter Dashboard
* Angular Routing
* API Integration

---

# Security Features

* Spring Security
* JWT Authentication
* Role-Based Access Control
* BCrypt Password Encryption
* Protected APIs

---

# Testing

Tested Modules:

* AuthService
* JobService
* ApplicationService
* ATS APIs
* Recommendation APIs
* Resume Upload APIs
* Redis Cache
* Kafka Producer & Consumer

---

# Setup Instructions

## Database

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
mvn clean install

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

## Docker

```bash
docker compose up
```

Containerized Services:

* MySQL
* Redis
* Kafka
* Spring Boot

---

# Future Enhancements

* Email Notifications
* Interview Scheduling
* Kubernetes Deployment
* AI-Based Resume Analysis
* Real-Time Notifications
* Application Tracking Dashboard

---

# Project Status

Backend: Complete

Frontend: Complete

JWT Authentication: Complete

Resume Upload: Complete

ATS Scoring: Complete

Recommendation Engine: Complete

Redis Integration: Complete

Kafka Integration: Complete

Docker Integration: Complete

Project Type: Full Stack AI-Powered Job Recruitment Platform

---

# Author

**Baddam Revanth Reddy**

B.Tech AIML | Java Full Stack Developer
