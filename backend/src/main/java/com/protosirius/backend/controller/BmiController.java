package com.protosirius.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.entity.Measure;
import com.protosirius.backend.service.BmiService;

@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/bmi")
@RestController
public class BmiController {
    private final BmiService bmiService;

    public BmiController(BmiService bmiService) {
        this.bmiService = bmiService;
    }

@PostMapping
    public BmiResponse create(@RequestBody BmiRequest request) {
        Measure saved= bmiService.MesureBMI(request.getPoidsKg(), request.getTailleCm());
    
        return BmiResponse.fromMeasure(saved);
    }
@GetMapping("/{id}")
    public BmiResponse getById(@PathVariable Long id) {
        Measure m = bmiService.getById(id);
        return BmiResponse.fromMeasure(m);
    }


}
