package com.protosirius.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.entity.Measure;
import com.protosirius.backend.service.StatsService;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/users")
public class StatsController {
    private final StatsService statsService;
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/{userId}/measures")
    public Page<MeasureSummaryResponse> getMeasures(@PathVariable int userId ,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        if (page < 0) page = 0;
        if (size <= 0) size = 10;
        if (size > 100) size = 100;

        Page<Measure> m=statsService.getUserStats(userId , PageRequest.of(page, size));
        return m.map(MeasureSummaryResponse::fromMeasure);

        
    }
    

}
