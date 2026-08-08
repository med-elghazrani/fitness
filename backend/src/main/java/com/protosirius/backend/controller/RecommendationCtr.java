package com.protosirius.backend.controller;

import com.protosirius.backend.dto.RecommendationRequest;
import com.protosirius.backend.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class RecommendationCtr {

    private final RecommendationService recommendationService;

    public RecommendationCtr(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommendations/next")
    public Map<String, Object> next(@RequestParam Long athleteId) {
        return recommendationService.recommendNext(athleteId);
    }

    @PostMapping("/recommendations/custom")
    public Map<String, Object> custom(@RequestBody RecommendationRequest request) {
        return recommendationService.recommendWithFilters(request);
    }

    @GetMapping("/recomendations")
    public Map<String, Object> oldNext(@RequestParam Long athleteId) {
        return recommendationService.recommendNext(athleteId);
    }
}