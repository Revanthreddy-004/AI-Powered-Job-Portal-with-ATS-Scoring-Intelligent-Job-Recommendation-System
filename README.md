# Job Portal with ATS Scoring & Intelligent Job Recommendation System

## Overview

Job Portal is a full-stack recruitment platform built using **Spring Boot, Spring Security, JWT Authentication, React, MySQL, Redis, Apache Kafka, and Docker**.

The application provides two implemented user roles: **Candidate** and **Recruiter**. Candidates can discover jobs, search and filter openings, apply to jobs, upload resumes, analyze resume compatibility with a selected job through ATS scoring, and receive personalized job recommendations. Recruiters can create, edit, delete, and manage jobs, view applications, and update candidate application statuses.

The project supports both:

- **Normal/local execution** for development using IntelliJ/terminal.
- **Full Docker execution** where the frontend, backend, MySQL, Redis, and Kafka run as containers.

The Docker MySQL database uses persistent storage, and the pre-Docker application data was migrated into the Docker database during setup.

---

# Tech Stack

## Backend

* Java 17
* Spring Boot 3.5.14
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL 8.0
* Redis
* Apache Kafka 3.9.1
* Maven
* Lombok
* Jakarta Validation
* JJWT 0.12.6
* Springdoc OpenAPI
* Apache PDFBox

## Frontend

* React
* Vite
* JavaScript / JSX
* React Router
* Axios
* HTML
* CSS

## DevOps

* Docker
* Docker Compose
* Nginx

---

# User Roles

## Candidate

Implemented candidate capabilities:

* Register a new account
* Login using email and password
* JWT-based authenticated session
* Browse available jobs
* Search jobs by combined criteria
* Search jobs by location
* Search jobs by experience
* Search jobs by minimum salary
* Paginated job listing
* View job details
* Apply for a job
* Prevent duplicate applications to the same job
* View submitted applications
* Upload a PDF resume
* Store resume information
* Extract resume text
* Analyze resume against a selected job
* View ATS score
* View matched skills
* View missing skills
* View recommended jobs
* Candidate dashboard
* Logout

## Recruiter

Implemented recruiter capabilities:

* Login using recruiter account
* Recruiter dashboard
* View total jobs
* View total applications
* View shortlisted applications
* View hired/selected applications
* Create jobs
* Associate jobs with a company
* Edit jobs
* Delete jobs
* View applications received for a job
* Shortlist candidates
* Reject candidates
* Select / hire candidates


# Authentication & Security

Implemented security features:

* User registration
* User login
* JWT token generation
* JWT token storage on the frontend
* JWT authentication filter
* Spring Security configuration
* Role-based authorization
* Protected frontend routes
* Protected backend APIs
* BCrypt password hashing
* Axios Authorization header integration
* Automatic handling of expired/unauthorized sessions
* Validation and exception handling

JWT tokens are stored in browser local storage on successful login and are attached to authenticated API requests through the Axios interceptor.

---

# Company Management

Companies are part of the current data model and are associated with jobs.

The recruiter job creation flow uses the company relationship when posting a job. This is already integrated into the backend model and does **not** require another separate integration just to complete the current recruiter workflow.

Implemented company APIs include:

```http
POST /api/companies

GET /api/companies

GET /api/companies/{id}
```


# Job Management

Implemented features:

* Create job
* View all jobs
* View individual job details
* Edit job
* Delete job
* Associate job with recruiter
* Associate job with company
* Store job title, description, skills, salary, location, and experience
* Recruiter-specific job listing

### APIs

```http
POST /api/jobs?recruiterId={recruiterId}

GET /api/jobs

GET /api/jobs/{id}

PUT /api/jobs/{id}

DELETE /api/jobs/{id}

GET /api/jobs/recruiter/{recruiterId}
```

---

# Search & Filtering

The Jobs page supports multiple working search/filter flows.

## Search By Location

```http
GET /api/jobs/search/location?location={location}
```

## Search By Salary

```http
GET /api/jobs/search/salary?salary={salary}
```

This searches using the minimum salary requirement.

## Search By Experience

```http
GET /api/jobs/search/experience?experience={experience}
```

## Combined Filter

```http
GET /api/jobs/filter?location={location}&experience={experience}&salary={salary}
```

### Supported filters

* Location
* Experience
* Minimum salary
* Combined search/filtering

---

# Pagination

The backend supports paginated job retrieval:

```http
GET /api/jobs/page?page=0&size=10
```

The current React Jobs page also provides frontend pagination for the visible job cards.

---

# Resume Upload System

Implemented resume features:

* PDF resume upload
* Candidate-specific resume storage
* Resume file path storage
* Resume text extraction
* Extracted text persistence
* Candidate resume access
* Docker upload persistence using a dedicated Docker volume

### API

```http
POST /api/resume/upload/{userId}
```

The candidate must upload a resume before using job-specific ATS analysis and resume-based recommendations.

---

# ATS Scoring System

The ATS feature analyzes a candidate's resume against a **selected job**.

Implemented features:

* Resume text analysis
* Job description matching
* Skill matching
* Matched skills detection
* Missing skills detection
* ATS score calculation
* Job-specific ATS analysis page

### API

```http
GET /api/ats/job/{jobId}/user/{userId}
```

### Current flow

```text
Jobs Page
   ↓
Select Job
   ↓
Analyze ATS
   ↓
Selected Job + Candidate Resume
   ↓
ATS Score
   ↓
Matched Skills / Missing Skills
```

ATS analysis is intentionally performed for the selected job rather than automatically running ATS analysis for every job.

---

# Intelligent Job Recommendation System

The recommendation system provides personalized job suggestions using candidate information and resume/skill matching.

Implemented features:

* Resume-based recommendations
* Skill matching
* Personalized job suggestions
* Redis-backed recommendation caching
* Candidate recommendation page

### API

```http
GET /api/recommendations/{userId}
```

The recommendation flow is integrated with the candidate experience and uses Redis caching to improve repeated recommendation requests.

---

# Application Management

## Apply For Job

```http
POST /api/applications/apply?candidateId={candidateId}&jobId={jobId}
```

## View Candidate Applications

```http
GET /api/applications/candidate/{candidateId}
```

## View Applications For Job

```http
GET /api/applications/job/{jobId}
```

## View All Applications

```http
GET /api/applications
```

## Update Application Status

```http
PUT /api/applications/{applicationId}/status
```

The recruiter workflow supports the implemented progression of application states such as:

* APPLIED
* SHORTLISTED
* REJECTED
* SELECTED / HIRED flow

---

# Business Rules

## Duplicate Application Prevention

A candidate cannot apply to the same job more than once.

If the candidate attempts to submit the same application again, the backend returns an error indicating that the job was already applied for.

```text
Already Applied
```

## Validation

Implemented validation includes:

* Jakarta Validation
* Request validation
* Global exception handling
* Password encryption using BCrypt
* Protected role-based API access

---

# Recruiter Dashboard & Analytics

The recruiter dashboard displays summary information including:

* Total Jobs
* Total Applications
* Shortlisted Applications
* Hired / Selected Applications

Recruiters can also navigate from the dashboard to:

* Create Job
* My Jobs
* Edit Job
* View Job Applications
* Delete Job

### Application count APIs

```http
GET /api/applications/count/job/{jobId}

GET /api/applications/count/status/{status}
```

---

# Redis Integration

Redis is integrated into the application for caching/performance-related operations.

The recommendation system uses Redis caching so repeated recommendation requests can be served efficiently instead of recalculating the complete result every time.

Redis is also part of the Docker Compose infrastructure.

### Docker Redis

```text
Host: localhost
Port: 6380
Container Port: 6379
```

The backend container communicates with Redis using the Docker service name and internal Redis port.

---

# Apache Kafka Integration

Kafka is integrated for asynchronous event processing around resume-related operations.

### Producer

* Publishes resume upload related events.

### Consumer

* Consumes the published resume-related events.

### Flow

```text
Resume Upload
      ↓
Kafka Producer
      ↓
Kafka Topic
      ↓
Kafka Consumer
```

Kafka is configured as part of the Docker Compose environment.

---

# Database Entities

## User

Main user information includes:

* id
* name
* email
* password
* role

Roles currently used by the application:

* CANDIDATE
* RECRUITER

## Company

* id
* company name
* location
* description

## Job

* id
* title
* description
* salary
* location
* experience
* skills
* recruiter
* company

## Resume

* id
* file name
* file path
* extracted text
* user / candidate relationship

## Application

* id
* status
* applied date/time
* candidate
* job

---

# Frontend Pages & Working Flows

## Public Pages

* Home
* Login
* Register

## Candidate Pages

* Candidate Dashboard
* Jobs
* Job Details
* My Applications
* Resume Upload
* ATS Analysis
* Recommended Jobs

## Recruiter Pages

* Recruiter Dashboard
* Create Job
* Edit Job
* Job Applications

### Frontend integration

The React frontend communicates with the Spring Boot backend through Axios.

A shared Axios instance:

* Reads the JWT token from local storage
* Adds the `Authorization: Bearer <token>` header
* Sets JSON content type for normal API requests
* Handles `FormData` correctly for resume uploads
* Handles unauthorized responses and session expiration

---

# Frontend Routing & Authorization

React Router is used for navigation.

Candidate routes are protected using role-based route protection, including:

```text
/jobs
/candidate-dashboard
/my-applications
/resume-upload
/ats-analysis/:jobId
/recommended-jobs
```

Recruiter routes include:

```text
/recruiter-dashboard
/create-job
/edit-job/:id
/job-applications/:id
```

Public routes include:

```text
/
/login
/register
```

Unauthorized routes are handled through a Not Found page.

---

# Styling

The React frontend uses shared CSS rather than maintaining large page-specific stylesheets.

Current shared styling structure:

```text
src/styles/
├── global.css
├── forms.css
├── cards.css
├── dashboard.css
├── home.css
└── NavBar.css
```

The navigation bar uses shared styling with a clean, medium-level visual design, hover states, active navigation state, responsive behavior, and a styled logout button.

---

# Local Development Setup

The project supports normal development without running the complete application inside Docker.

## Local architecture

```text
React frontend       → localhost:5173
Spring Boot backend  → localhost:8080
MySQL                → localhost:3306
Redis                → localhost:6379
Kafka                → localhost:9092
```

### Backend

From the `BACKEND` directory:

```bash
mvn clean install
mvn spring-boot:run
```

### Frontend

From the `FRONTEND` directory:

```bash
npm install
npm run dev
```

The development frontend uses the local backend API configuration.

---

# Docker Containerization

The project is fully containerized using Docker Compose.

### Containerized services

* React frontend
* Nginx
* Spring Boot backend
* MySQL
* Redis
* Apache Kafka

### Docker files

```text
BACKEND/
└── Dockerfile

FRONTEND/
├── Dockerfile
└── nginx.conf

ROOT/
└── docker-compose.yml
```

---

# Docker Architecture

The Docker deployment runs as:

```text
Browser
   ↓
Nginx / React
   ↓
Spring Boot Backend
   ├── MySQL
   ├── Redis
   └── Kafka
```

The React Docker build uses Nginx and proxies `/api` requests internally to the backend container. This keeps browser requests on the same origin and avoids frontend-to-backend CORS issues in the Docker deployment.

---

# Docker Ports

Current Docker host mappings:

| Service | Host | Container |
|---|---:|---:|
| React / Nginx | 80 | 80 |
| Spring Boot | 8081 | 8081 |
| MySQL | 3307 | 3306 |
| Redis | 6380 | 6379 |
| Kafka | 9093 | 9092 |

### Docker application URL

```text
http://localhost
```

### Docker backend URL

```text
http://localhost:8081
```

The browser normally reaches the API through the frontend Nginx proxy at `/api`.

---

# Docker Database Persistence

MySQL data is stored using the Docker volume:

```text
mysql_data
```

Additional persistent volumes are used for:

```text
redis_data
kafka_data
uploads_data
```

The Docker database was populated by importing the pre-Docker `job_portal` database, so the existing application data was retained during migration.

**Do not use `docker compose down -v` unless you intentionally want to remove the persistent Docker volumes.**

---

# Docker Run Commands

From the project root:

### Start the complete application

```bash
docker compose up -d
```

### Build and start after code changes

```bash
docker compose up -d --build
```

### Stop the application without deleting volumes

```bash
docker compose down
```

### Check running services

```bash
docker compose ps
```

Expected services:

```text
jobportal-frontend
jobportal-backend
jobportal-mysql
jobportal-redis
jobportal-kafka
```

---

# Environment Configuration

The project uses environment variables so local and Docker execution can use different service addresses without changing application code.

## Backend variables

Typical variables include:

```text
SERVER_PORT
DB_URL
DB_USERNAME
DB_PASSWORD
REDIS_HOST
REDIS_PORT
KAFKA_BOOTSTRAP_SERVERS
```

### Local defaults

```text
SERVER_PORT=8080
DB_URL=jdbc:mysql://localhost:3306/job_portal
REDIS_HOST=localhost
REDIS_PORT=6379
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
```

### Docker values

Inside Docker, the backend communicates using Compose service names:

```text
SERVER_PORT=8081
DB_URL=jdbc:mysql://mysql:3306/job_portal
REDIS_HOST=redis
REDIS_PORT=6379
KAFKA_BOOTSTRAP_SERVERS=kafka:9092
```

Database passwords should be supplied through environment variables and must not be committed to GitHub.

---

# Resume Storage in Docker

Resume files are persisted through the Docker volume:

```text
uploads_data
```

The backend mounts this volume at:

```text
/app/uploads
```

This keeps uploaded resumes available across backend container recreation.

---

# Error Handling & Validation

The backend includes:

* Request validation
* Runtime exception handling
* Duplicate application validation
* Authentication failure handling
* Protected endpoint access control
* JWT-related unauthorized handling

The frontend displays user-friendly error messages such as login failures, duplicate application errors, and network/API errors.

---

## Why companyId/company association remains

The company relationship is already part of the job model and recruiter job-posting flow. It is useful domain data and does not create a missing feature that has to be re-integrated before the current project is considered complete.

An additional company-management UI can be introduced later only if the application requirements call for it.

---

# Future Enhancements

* Advanced recruiter analytics
* Email notifications
* Interview scheduling
* Real-time notifications
* Advanced AI resume analysis
* More sophisticated job recommendation ranking
* Automated JUnit/Mockito test coverage
* CI/CD pipeline
* Kubernetes deployment
* Cloud deployment

---

**Project Type:** Full Stack Java Job Recruitment Platform with ATS and Recommendation system

---

# Author

**Baddam Revanth Reddy**

B.Tech AIML | Java Full Stack Developer
