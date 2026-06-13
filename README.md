# Job Portal Backend Application

## Overview

A full-featured Job Portal Backend Application built using Spring Boot, Spring Security, JWT Authentication, MySQL, JPA/Hibernate, Docker, and Swagger.

The system supports three roles:

* ADMIN
* RECRUITER
* CANDIDATE

The application provides secure authentication, role-based access control, job management, company management, candidate applications, dashboards, filtering, pagination, validation, testing, and containerized deployment.

---

## Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* Maven

### Database

* MySQL

### Testing

* JUnit 5
* Mockito

### Documentation

* Swagger OpenAPI

### DevOps

* Docker
* Docker Compose

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Token Generation
* JWT Authentication Filter
* Role Based Access Control (RBAC)

### Company Management

* Create Company
* Update Company
* Delete Company
* Get Company Details

### Job Management

* Create Job
* Update Job
* Delete Job
* View Jobs
* Pagination
* Search by Location
* Search by Experience
* Search by Salary
* Combined Filtering

### Application Management

* Apply for Jobs
* Prevent Duplicate Applications
* View Applications by Candidate
* View Applications by Job
* Update Application Status

### Dashboards

#### Candidate Dashboard

* View Applied Jobs
* Track Application Status

#### Recruiter Dashboard

* View Applications for Jobs
* Update Candidate Status

### Validation

* Request Validation using Jakarta Validation

### Exception Handling

* Global Exception Handling

### API Documentation

* Swagger UI Integration

### Testing

* Unit Testing using JUnit and Mockito

### Containerization

* Dockerized Spring Boot Application
* Docker Compose for MySQL + Backend

---

## Security

* JWT Authentication
* Password Encryption using BCrypt
* Role Based Authorization
* Stateless Session Management

---

## Running Locally

```bash
mvn spring-boot:run
```

## Running with Docker

```bash
mvn clean package
docker compose up --build
```

## Author

**BADDAM REVANTH REDDY**

Spring Boot | Java | MySQL | Docker
