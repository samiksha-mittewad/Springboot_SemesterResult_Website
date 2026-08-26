package com.vit.result.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "subject_results")
public class SubjectResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;

    private double mseMarks;

    private double eseMarks;

    private double totalMarks;

    private String grade;

    private int gradePoint;

    @ManyToOne
    @JoinColumn(name = "student_result_id")
    @JsonIgnore
    private StudentResult studentResult;


    public SubjectResult() {
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

    public int getGradePoint() {
        return gradePoint;
    }

    public void setGradePoint(int gradePoint) {
        this.gradePoint = gradePoint;
    }

    public StudentResult getStudentResult() {
        return studentResult;
    }

    public void setStudentResult(StudentResult studentResult) {
        this.studentResult = studentResult;
    }
}