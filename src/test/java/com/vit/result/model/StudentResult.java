package com.vit.result.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student_results")
public class StudentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;

    private String rollNumber;

    private String semester;

    private double percentage;

    private double sgpa;

    @OneToMany(
            mappedBy = "studentResult",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SubjectResult> subjects = new ArrayList<>();


    public StudentResult() {
    }


    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public double getSgpa() {
        return sgpa;
    }

    public void setSgpa(double sgpa) {
        this.sgpa = sgpa;
    }

    public List<SubjectResult> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectResult> subjects) {
        this.subjects = subjects;
    }
}