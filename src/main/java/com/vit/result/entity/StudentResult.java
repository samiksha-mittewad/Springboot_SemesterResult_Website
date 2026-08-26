package com.vit.result.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class StudentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String studentId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "student_result_id")
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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public List<SubjectResult> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectResult> subjects) {
        this.subjects = subjects;
    }
}