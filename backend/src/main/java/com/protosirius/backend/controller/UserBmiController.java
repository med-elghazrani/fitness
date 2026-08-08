package com.protosirius.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.entity.Measure;
import com.protosirius.backend.service.BmiService;

@CrossOrigin(origins = "http://localhost:8080") 
@RestController
@RequestMapping("/api/users/")
public class UserBmiController {
    private final BmiService bmiService;
    public UserBmiController(BmiService bmiService) {
        this.bmiService = bmiService;
    }

    @PostMapping("/{userId}/bmi")
    public BmiResponse calculateBmi(@PathVariable int userId, @RequestBody BmiRequest request) {
        Measure measure = bmiService.MesureBMIForUser(userId, request.getPoidsKg(), request.getTailleCm());
        return BmiResponse.fromMeasure(measure);
    }
    

}
