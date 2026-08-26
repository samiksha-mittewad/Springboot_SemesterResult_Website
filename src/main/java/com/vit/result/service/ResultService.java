package com.vit.result.service;

import com.vit.result.entity.StudentResult;
import com.vit.result.entity.SubjectResult;
import com.vit.result.repository.StudentResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    private final StudentResultRepository studentResultRepository;

    public ResultService(StudentResultRepository studentResultRepository) {
        this.studentResultRepository = studentResultRepository;
    }

    public StudentResult calculateAndSaveResult(StudentResult studentResult) {

        List<SubjectResult> calculatedSubjects =
                studentResult.getSubjects()
                        .stream()
                        .map(subject -> calculateResult(
                                subject.getSubjectName(),
                                subject.getMseMarks(),
                                subject.getEseMarks()
                        ))
                        .toList();

        studentResult.setSubjects(calculatedSubjects);

        return studentResultRepository.save(studentResult);
    }

    public SubjectResult calculateResult(
            String subjectName,
            double mseMarks,
            double eseMarks) {

        SubjectResult result = new SubjectResult();

        result.setSubjectName(subjectName);
        result.setMseMarks(mseMarks);
        result.setEseMarks(eseMarks);

        // MSE is out of 30 and ESE is out of 70
        double total = mseMarks + eseMarks;

        result.setTotalMarks(total);
        result.setGrade(calculateGrade(total));

        return result;
    }

    private String calculateGrade(double total) {

        if (total >= 90) {
            return "A+";
        } else if (total >= 80) {
            return "A";
        } else if (total >= 70) {
            return "B+";
        } else if (total >= 60) {
            return "B";
        } else if (total >= 50) {
            return "C";
        } else if (total >= 40) {
            return "D";
        } else {
            return "F";
        }
    }
}