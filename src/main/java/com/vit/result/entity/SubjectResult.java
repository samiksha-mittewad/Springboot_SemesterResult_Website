package com.vit.result.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SubjectResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;
    private double mseMarks;
    private double eseMarks;
    private double totalMarks;
    private String grade;

    public SubjectResult() {
    }

    public SubjectResult(String subjectName, double mseMarks, double eseMarks) {
        this.subjectName = subjectName;
        this.mseMarks = mseMarks;
        this.eseMarks = eseMarks;
    }

    public Long getId() {
        return id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public double getMseMarks() {
        return mseMarks;
    }

    public void setMseMarks(double mseMarks) {
        this.mseMarks = mseMarks;
    }

    public double getEseMarks() {
        return eseMarks;
    }

    public void setEseMarks(double eseMarks) {
        this.eseMarks = eseMarks;
    }

    public double getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(double totalMarks) {
        this.totalMarks = totalMarks;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}