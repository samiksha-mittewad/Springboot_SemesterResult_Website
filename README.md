# VIT Semester Result Calculator

A responsive web application developed as part of a **Web Technologies assignment** to prepare and manage the semester results of VIT students.

## Assignment

> Design and develop a responsive website to prepare one semester result of VIT students using JavaScript, Spring Boot, and MySQL/MongoDB/Oracle. Take any four subjects with MSE Marks (30%) and ESE Marks (70%).

This project implements the assignment using **JavaScript, Spring Boot, and MySQL**.

## Features

- Responsive interface for entering student details and marks
- Supports four subjects:
  - Web Technologies
  - Data Structures and Algorithms
  - Database Management Systems
  - Object Oriented Programming
- MSE marks out of 30
- ESE marks out of 70
- Automatic total marks calculation
- Automatic grade calculation
- Semester percentage calculation
- Data stored permanently in MySQL
- Spring Boot REST API integration

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Java, Spring Boot |
| Database | MySQL |
| ORM | Spring Data JPA / Hibernate |
| Build Tool | Maven |

## Result Calculation

```text
Total Marks = MSE Marks + ESE Marks
```

| Marks | Grade |
|---|---|
| 90 - 100 | A+ |
| 80 - 89 | A |
| 70 - 79 | B+ |
| 60 - 69 | B |
| 50 - 59 | C |
| 40 - 49 | D |
| Below 40 | F |

## Project Structure

```text
result/
├── src/main/java/com/vit/result/
│   ├── controller/
│   │   └── ResultController.java
│   ├── entity/
│   │   ├── StudentResult.java
│   │   └── SubjectResult.java
│   ├── repository/
│   │   └── StudentResultRepository.java
│   ├── service/
│   │   └── ResultService.java
│   └── ResultApplication.java
│
├── src/main/resources/
│   ├── static/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── application.properties
│
├── pom.xml
└── README.md
```

## Application Workflow

```text
User enters student details and marks
        ↓
JavaScript sends data to Spring Boot
        ↓
Spring Boot calculates totals and grades
        ↓
Spring Data JPA saves the result
        ↓
MySQL database stores the data
        ↓
Calculated result is displayed on the website
```

## Database Setup

Create the database:

```sql
CREATE DATABASE vit_result_db;
```

Configure the database connection in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vit_result_db
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

## Run the Project

```powershell
.\mvnw spring-boot:run
```

Open the application in your browser:

```text
http://localhost:8080
```

Use the configured port if your application runs on a different port.

## Verify Saved Data

After submitting the form, run the following queries in MySQL Workbench:

```sql
USE vit_result_db;

SELECT * FROM student_result;

SELECT * FROM subject_result;
```

The data entered through the website will be saved in the database.

## Screenshots

### Result Calculator

![Application Screenshot](images/application.png)

### MySQL Database

![Database Screenshot](images/database.png)

## Author

**Samiksha Mittewad**  
Second Year B.Tech Computer Science Engineering  
Vishwakarma Institute of Technology, Pune

## Academic Purpose

Developed as a Web Technologies assignment demonstrating responsive web development, JavaScript, Spring Boot, REST APIs, JPA/Hibernate, and MySQL integration.
