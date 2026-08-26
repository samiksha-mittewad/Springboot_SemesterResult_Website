package com.vit.result.controller;

import com.vit.result.entity.StudentResult;
import com.vit.result.service.ResultService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/result")
@CrossOrigin(origins = "*")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping("/calculate")
    public StudentResult calculateResult(
            @RequestBody StudentResult studentResult) {

        return resultService.calculateAndSaveResult(studentResult);
    }
}