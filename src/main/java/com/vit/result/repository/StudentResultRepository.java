package com.vit.result.repository;

import com.vit.result.entity.StudentResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentResultRepository extends JpaRepository<StudentResult, Long> {

}