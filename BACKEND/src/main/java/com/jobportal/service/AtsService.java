package com.jobportal.service;

import com.jobportal.dto.AtsResponse;
import com.jobportal.entity.Job;
import com.jobportal.entity.Resume;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AtsService {

    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;

    private final RedisTemplate<String, Object> redisTemplate;


    /*
     * ============================================================
     * MASTER IT SKILL DATABASE
     * ============================================================
     *
     * Rule-based ATS skill dictionary covering major IT roles:
     *
     * 1. Programming Languages
     * 2. Frontend
     * 3. Backend
     * 4. Java Ecosystem
     * 5. Python Ecosystem
     * 6. JavaScript Ecosystem
     * 7. Databases
     * 8. Cloud
     * 9. DevOps
     * 10. Containers & Orchestration
     * 11. CI/CD
     * 12. Version Control
     * 13. Testing
     * 14. Security
     * 15. Networking
     * 16. Data Science
     * 17. AI / ML
     * 18. Big Data
     * 19. Data Engineering
     * 20. Mobile Development
     * 21. Architecture
     * 22. APIs
     * 23. Messaging
     * 24. Monitoring
     * 25. Tools
     */


    private static final Map<String, List<String>> SKILL_ALIASES =
            createSkillDatabase();


    private static Map<String, List<String>> createSkillDatabase() {

        Map<String, List<String>> skills =
                new LinkedHashMap<>();


        // ========================================================
        // PROGRAMMING LANGUAGES
        // ========================================================

        add(skills, "Java",
                "java");

        add(skills, "Python",
                "python");

        add(skills, "JavaScript",
                "javascript", "js");

        add(skills, "TypeScript",
                "typescript", "ts");

        add(skills, "C",
                "c programming", "c language");

        add(skills, "C++",
                "c++", "cpp");

        add(skills, "C#",
                "c#", "c sharp");

        add(skills, "Go",
                "golang", "go language");

        add(skills, "Rust",
                "rust");

        add(skills, "Kotlin",
                "kotlin");

        add(skills, "Swift",
                "swift");

        add(skills, "Dart",
                "dart");

        add(skills, "PHP",
                "php");

        add(skills, "Ruby",
                "ruby");

        add(skills, "Scala",
                "scala");

        add(skills, "R",
                "r programming", "r language");

        add(skills, "MATLAB",
                "matlab");

        add(skills, "Perl",
                "perl");


        // ========================================================
        // FRONTEND DEVELOPMENT
        // ========================================================

        add(skills, "HTML",
                "html", "html5");

        add(skills, "CSS",
                "css", "css3");

        add(skills, "Bootstrap",
                "bootstrap");

        add(skills, "Tailwind CSS",
                "tailwind", "tailwind css");

        add(skills, "Sass",
                "sass", "scss");

        add(skills, "React",
                "react", "react.js", "reactjs");

        add(skills, "Angular",
                "angular", "angularjs");

        add(skills, "Vue.js",
                "vue", "vue.js", "vuejs");

        add(skills, "Next.js",
                "next.js", "nextjs");

        add(skills, "Nuxt.js",
                "nuxt", "nuxt.js");

        add(skills, "Redux",
                "redux");

        add(skills, "Redux Toolkit",
                "redux toolkit");

        add(skills, "React Native",
                "react native");

        add(skills, "jQuery",
                "jquery");

        add(skills, "Webpack",
                "webpack");

        add(skills, "Vite",
                "vite");

        add(skills, "Material UI",
                "material ui", "mui");

        add(skills, "Bootstrap",
                "bootstrap");


        // ========================================================
        // BACKEND DEVELOPMENT
        // ========================================================

        add(skills, "Node.js",
                "node.js", "nodejs", "node");

        add(skills, "Express.js",
                "express", "express.js", "expressjs");

        add(skills, "Django",
                "django");

        add(skills, "Flask",
                "flask");

        add(skills, "FastAPI",
                "fastapi", "fast api");

        add(skills, "Spring",
                "spring framework");

        add(skills, "Spring Boot",
                "spring boot", "springboot");

        add(skills, "Spring MVC",
                "spring mvc");

        add(skills, "Spring Security",
                "spring security");

        add(skills, "Spring Cloud",
                "spring cloud");

        add(skills, "Hibernate",
                "hibernate");

        add(skills, "JPA",
                "jpa", "java persistence api");

        add(skills, "JDBC",
                "jdbc");

        add(skills, "Servlets",
                "servlet", "servlets");

        add(skills, "JSP",
                "jsp", "java server pages");

        add(skills, "ASP.NET",
                "asp.net", "asp net");

        add(skills, ".NET",
                ".net", "dotnet");

        add(skills, "Laravel",
                "laravel");

        add(skills, "Ruby on Rails",
                "ruby on rails", "rails");


        // ========================================================
        // API DEVELOPMENT
        // ========================================================

        add(skills, "REST API",
                "rest api", "restful api", "restful services");

        add(skills, "GraphQL",
                "graphql");

        add(skills, "SOAP",
                "soap", "soap api");

        add(skills, "WebSockets",
                "websocket", "websockets");

        add(skills, "gRPC",
                "grpc");

        add(skills, "Microservices",
                "microservices", "microservices architecture");

        add(skills, "API Gateway",
                "api gateway");


        // ========================================================
        // DATABASES - SQL
        // ========================================================

        add(skills, "SQL",
                "sql", "structured query language");

        add(skills, "MySQL",
                "mysql");

        add(skills, "PostgreSQL",
                "postgresql", "postgres");

        add(skills, "Oracle",
                "oracle database", "oracle db");

        add(skills, "SQL Server",
                "sql server", "mssql", "microsoft sql server");

        add(skills, "SQLite",
                "sqlite");

        add(skills, "MariaDB",
                "mariadb");

        add(skills, "PL/SQL",
                "pl/sql", "plsql");


        // ========================================================
        // NOSQL DATABASES
        // ========================================================

        add(skills, "MongoDB",
                "mongodb", "mongo db");

        add(skills, "Redis",
                "redis");

        add(skills, "Cassandra",
                "cassandra");

        add(skills, "DynamoDB",
                "dynamodb", "dynamo db");

        add(skills, "CouchDB",
                "couchdb");

        add(skills, "Neo4j",
                "neo4j");

        add(skills, "Elasticsearch",
                "elasticsearch");

        add(skills, "Firebase",
                "firebase");


        // ========================================================
        // ORM / DATABASE TECHNOLOGIES
        // ========================================================

        add(skills, "Entity Framework",
                "entity framework");

        add(skills, "MyBatis",
                "mybatis");

        add(skills, "SQLAlchemy",
                "sqlalchemy");


        // ========================================================
        // CLOUD - AWS
        // ========================================================

        add(skills, "AWS",
                "aws", "amazon web services");

        add(skills, "EC2",
                "ec2", "amazon ec2");

        add(skills, "S3",
                "s3", "amazon s3");

        add(skills, "RDS",
                "rds", "amazon rds");

        add(skills, "Lambda",
                "aws lambda", "lambda functions");

        add(skills, "CloudFormation",
                "cloudformation");

        add(skills, "CloudWatch",
                "cloudwatch");

        add(skills, "ECS",
                "ecs", "amazon ecs");

        add(skills, "EKS",
                "eks", "amazon eks");


        // ========================================================
        // CLOUD - AZURE
        // ========================================================

        add(skills, "Azure",
                "azure", "microsoft azure");

        add(skills, "Azure DevOps",
                "azure devops");

        add(skills, "Azure Functions",
                "azure functions");

        add(skills, "Azure Kubernetes Service",
                "aks", "azure kubernetes service");


        // ========================================================
        // CLOUD - GOOGLE
        // ========================================================

        add(skills, "Google Cloud",
                "gcp", "google cloud", "google cloud platform");

        add(skills, "Google Cloud Functions",
                "google cloud functions");

        add(skills, "BigQuery",
                "bigquery");


        // ========================================================
        // DEVOPS
        // ========================================================

        add(skills, "Docker",
                "docker");

        add(skills, "Kubernetes",
                "kubernetes", "k8s");

        add(skills, "Jenkins",
                "jenkins");

        add(skills, "GitHub Actions",
                "github actions");

        add(skills, "GitLab CI",
                "gitlab ci", "gitlab ci/cd");

        add(skills, "CircleCI",
                "circleci");

        add(skills, "Terraform",
                "terraform");

        add(skills, "Ansible",
                "ansible");

        add(skills, "Chef",
                "chef");

        add(skills, "Puppet",
                "puppet");

        add(skills, "Nginx",
                "nginx");

        add(skills, "Apache",
                "apache web server");

        add(skills, "Linux",
                "linux");

        add(skills, "Unix",
                "unix");

        add(skills, "Shell Scripting",
                "shell scripting", "shell script");

        add(skills, "Bash",
                "bash");

        add(skills, "PowerShell",
                "powershell");


        // ========================================================
        // VERSION CONTROL
        // ========================================================

        add(skills, "Git",
                "git");

        add(skills, "GitHub",
                "github");

        add(skills, "GitLab",
                "gitlab");

        add(skills, "Bitbucket",
                "bitbucket");

        add(skills, "SVN",
                "svn", "subversion");


        // ========================================================
        // MESSAGE QUEUES / EVENT STREAMING
        // ========================================================

        add(skills, "Apache Kafka",
                "kafka", "apache kafka");

        add(skills, "RabbitMQ",
                "rabbitmq");

        add(skills, "ActiveMQ",
                "activemq");

        add(skills, "Apache Pulsar",
                "apache pulsar", "pulsar");


        // ========================================================
        // TESTING
        // ========================================================

        add(skills, "JUnit",
                "junit");

        add(skills, "Mockito",
                "mockito");

        add(skills, "Selenium",
                "selenium");

        add(skills, "Cypress",
                "cypress");

        add(skills, "Playwright",
                "playwright");

        add(skills, "Jest",
                "jest");

        add(skills, "PyTest",
                "pytest", "py.test");

        add(skills, "Postman",
                "postman");

        add(skills, "TestNG",
                "testng");

        add(skills, "Unit Testing",
                "unit testing", "unit test");

        add(skills, "Integration Testing",
                "integration testing", "integration test");

        add(skills, "Automation Testing",
                "automation testing", "automated testing");

        add(skills, "Manual Testing",
                "manual testing");


        // ========================================================
        // SECURITY
        // ========================================================

        add(skills, "JWT",
                "jwt", "json web token");

        add(skills, "OAuth",
                "oauth", "oauth2", "oauth 2.0");

        add(skills, "OpenID Connect",
                "openid connect");

        add(skills, "Spring Security",
                "spring security");

        add(skills, "Cybersecurity",
                "cybersecurity", "cyber security");

        add(skills, "Network Security",
                "network security");

        add(skills, "Application Security",
                "application security");

        add(skills, "OWASP",
                "owasp");

        add(skills, "Penetration Testing",
                "penetration testing", "pentesting");

        add(skills, "Ethical Hacking",
                "ethical hacking");


        // ========================================================
        // AI / MACHINE LEARNING
        // ========================================================

        add(skills, "Machine Learning",
                "machine learning", "machine-learning");

        add(skills, "Deep Learning",
                "deep learning");

        add(skills, "Artificial Intelligence",
                "artificial intelligence", "ai");

        add(skills, "Natural Language Processing",
                "natural language processing", "nlp");

        add(skills, "Computer Vision",
                "computer vision");

        add(skills, "Generative AI",
                "generative ai", "genai");

        add(skills, "Large Language Models",
                "large language models", "llm", "llms");

        add(skills, "Neural Networks",
                "neural networks", "neural network");

        add(skills, "TensorFlow",
                "tensorflow");

        add(skills, "PyTorch",
                "pytorch");

        add(skills, "Scikit-learn",
                "scikit-learn", "sklearn");

        add(skills, "Keras",
                "keras");

        add(skills, "OpenCV",
                "opencv");

        add(skills, "Hugging Face",
                "hugging face");

        add(skills, "LangChain",
                "langchain");

        add(skills, "Prompt Engineering",
                "prompt engineering");


        // ========================================================
        // DATA SCIENCE
        // ========================================================

        add(skills, "Data Science",
                "data science");

        add(skills, "Data Analysis",
                "data analysis", "data analytics");

        add(skills, "Pandas",
                "pandas");

        add(skills, "NumPy",
                "numpy");

        add(skills, "Matplotlib",
                "matplotlib");

        add(skills, "Seaborn",
                "seaborn");

        add(skills, "Power BI",
                "power bi", "powerbi");

        add(skills, "Tableau",
                "tableau");

        add(skills, "Excel",
                "excel", "microsoft excel");

        add(skills, "Statistics",
                "statistics", "statistical analysis");


        // ========================================================
        // BIG DATA / DATA ENGINEERING
        // ========================================================

        add(skills, "Apache Spark",
                "spark", "apache spark");

        add(skills, "Hadoop",
                "hadoop", "apache hadoop");

        add(skills, "Hive",
                "hive", "apache hive");

        add(skills, "HBase",
                "hbase");

        add(skills, "Apache Airflow",
                "airflow", "apache airflow");

        add(skills, "ETL",
                "etl", "extract transform load");

        add(skills, "Data Warehousing",
                "data warehousing", "data warehouse");

        add(skills, "Data Pipelines",
                "data pipelines", "data pipeline");

        add(skills, "Databricks",
                "databricks");

        add(skills, "Snowflake",
                "snowflake");


        // ========================================================
        // MOBILE DEVELOPMENT
        // ========================================================

        add(skills, "Android",
                "android development", "android");

        add(skills, "Android Studio",
                "android studio");

        add(skills, "iOS",
                "ios development", "ios");

        add(skills, "Flutter",
                "flutter");

        add(skills, "React Native",
                "react native");


        // ========================================================
        // ARCHITECTURE / DESIGN
        // ========================================================

        add(skills, "Object Oriented Programming",
                "object oriented programming", "oop", "oops");

        add(skills, "Data Structures",
                "data structures", "dsa");

        add(skills, "Algorithms",
                "algorithms");

        add(skills, "Design Patterns",
                "design patterns");

        add(skills, "System Design",
                "system design");

        add(skills, "Software Architecture",
                "software architecture");

        add(skills, "Distributed Systems",
                "distributed systems");

        add(skills, "Event Driven Architecture",
                "event driven architecture");

        add(skills, "Agile",
                "agile", "agile methodology");

        add(skills, "Scrum",
                "scrum");


        // ========================================================
        // MONITORING / OBSERVABILITY
        // ========================================================

        add(skills, "Prometheus",
                "prometheus");

        add(skills, "Grafana",
                "grafana");

        add(skills, "ELK Stack",
                "elk stack", "elk");

        add(skills, "Logstash",
                "logstash");

        add(skills, "Kibana",
                "kibana");

        add(skills, "Splunk",
                "splunk");


        // ========================================================
        // BUILD TOOLS
        // ========================================================

        add(skills, "Maven",
                "maven", "apache maven");

        add(skills, "Gradle",
                "gradle");

        add(skills, "npm",
                "npm");

        add(skills, "Yarn",
                "yarn");

        add(skills, "pip",
                "pip");


        // ========================================================
        // PROJECT / DEVELOPMENT TOOLS
        // ========================================================

        add(skills, "Jira",
                "jira");

        add(skills, "Confluence",
                "confluence");

        add(skills, "IntelliJ IDEA",
                "intellij", "intellij idea");

        add(skills, "Eclipse",
                "eclipse ide", "eclipse");

        add(skills, "Visual Studio Code",
                "visual studio code", "vs code");

        add(skills, "Swagger",
                "swagger");

        add(skills, "OpenAPI",
                "openapi", "open api");


        // ========================================================
        // NETWORKING
        // ========================================================

        add(skills, "TCP/IP",
                "tcp/ip", "tcp ip");

        add(skills, "HTTP",
                "http");

        add(skills, "HTTPS",
                "https");

        add(skills, "DNS",
                "dns");

        add(skills, "REST",
                "rest");

        add(skills, "Networking",
                "computer networking", "networking");

        add(skills, "VPN",
                "vpn");

        add(skills, "Load Balancing",
                "load balancing", "load balancer");


        return skills;
    }


    /*
     * Helper method for adding skills and aliases.
     */
    private static void add(
            Map<String, List<String>> map,
            String skill,
            String... aliases) {

        map.put(
                skill,
                Arrays.asList(aliases)
        );
    }


    // ============================================================
    // ATS SCORE
    // ============================================================

    public AtsResponse getScore(
            Long userId,
            Long jobId) {

        String key =
                "ats:"
                        + userId
                        + ":"
                        + jobId;


        // --------------------------------------------------------
        // REDIS CACHE CHECK
        // --------------------------------------------------------

        Object cached =
                redisTemplate
                        .opsForValue()
                        .get(key);

        if (cached != null) {

            System.out.println(
                    "ATS REDIS HIT");

            return (AtsResponse) cached;
        }


        // --------------------------------------------------------
        // GET RESUME
        // --------------------------------------------------------

        Resume resume =
                resumeRepository
                        .findByUserId(userId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Resume not found for user"));


        // --------------------------------------------------------
        // GET JOB
        // --------------------------------------------------------

        Job job =
                jobRepository
                        .findById(jobId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Job not found"));


        // --------------------------------------------------------
        // CALCULATE ATS
        // --------------------------------------------------------

        AtsResponse response =
                calculateScore(
                        resume.getExtractedText(),
                        job.getDescription()
                );


        // --------------------------------------------------------
        // STORE RESULT IN REDIS
        // --------------------------------------------------------

        redisTemplate
                .opsForValue()
                .set(
                        key,
                        response
                );


        System.out.println(
                "ATS DB/CALC HIT");


        return response;
    }


    // ============================================================
    // RULE-BASED ATS BUSINESS LOGIC
    // ============================================================

    public AtsResponse calculateScore(
            String resumeText,
            String jobDescription) {


        if (resumeText == null) {
            resumeText = "";
        }

        if (jobDescription == null) {
            jobDescription = "";
        }


        String resume =
                normalize(resumeText);

        String job =
                normalize(jobDescription);


        List<String> matched =
                new ArrayList<>();

        List<String> missing =
                new ArrayList<>();


        /*
         * Check every skill in our master IT skill database.
         */
        for (Map.Entry<String, List<String>> entry
                : SKILL_ALIASES.entrySet()) {


            String skill =
                    entry.getKey();

            List<String> aliases =
                    entry.getValue();


            /*
             * Is this skill actually required
             * by the job?
             */
            boolean requiredByJob =
                    containsAny(
                            job,
                            aliases
                    );


            if (!requiredByJob) {
                continue;
            }


            /*
             * Job requires the skill.
             *
             * Now check whether the candidate
             * has the skill.
             */
            boolean candidateHasSkill =
                    containsAny(
                            resume,
                            aliases
                    );


            if (candidateHasSkill) {

                matched.add(skill);

            } else {

                missing.add(skill);
            }
        }


        // --------------------------------------------------------
        // SCORE CALCULATION
        // --------------------------------------------------------

        int totalRequiredSkills =
                matched.size()
                        + missing.size();


        int score = 0;


        if (totalRequiredSkills > 0) {

            score =
                    (matched.size() * 100)
                            / totalRequiredSkills;
        }


        System.out.println(
                "ATS MATCHED SKILLS = "
                        + matched);


        System.out.println(
                "ATS MISSING SKILLS = "
                        + missing);


        System.out.println(
                "ATS SCORE = "
                        + score);


        return new AtsResponse(
                score,
                matched,
                missing
        );
    }


    // ============================================================
    // TEXT NORMALIZATION
    // ============================================================

    private String normalize(
            String text) {

        return text
                .toLowerCase()
                .replaceAll("\\s+", " ")
                .trim();
    }


    // ============================================================
    // SKILL MATCHING
    // ============================================================

    private boolean containsAny(
            String text,
            List<String> aliases) {


        for (String alias : aliases) {

            String normalizedAlias =
                    normalize(alias);


            /*
             * Word-boundary matching prevents
             * false matches such as:
             *
             * SQL -> matching inside NoSQL
             *
             * C -> matching inside React
             */
            String regex =
                    "(?<![a-z0-9])"
                            + Pattern.quote(normalizedAlias)
                            + "(?![a-z0-9])";


            if (Pattern
                    .compile(regex)
                    .matcher(text)
                    .find()) {

                return true;
            }
        }


        return false;
    }
}
