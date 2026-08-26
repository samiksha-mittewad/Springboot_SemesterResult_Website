package com.vit.result.repository;

import com.vit.result.model.StudentResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentResultRepository
        extends JpaRepository<StudentResult, Long> {

}