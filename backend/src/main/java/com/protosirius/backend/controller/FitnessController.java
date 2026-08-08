package com.protosirius.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.service.NutritionService;
import com.protosirius.backend.service.QuizService;

@RestController
@RequestMapping("/api/fitness")
public class FitnessController {

    private final QuizService quizService;
    private final NutritionService nutritionService;

    public FitnessController(QuizService quizService, NutritionService nutritionService) {
        this.quizService = quizService;
        this.nutritionService = nutritionService;
    }

    @PostMapping("/calculer")
    public ResponseEntity<NutritionService.CalculResultat> calculerNutrition(
            @RequestBody QuizService.QuizRequest request) {

        var profilData = quizService.creerProfilData(request);
        var resultat = nutritionService.calculer(profilData);

        return ResponseEntity.ok(resultat);
    }

    @PostMapping("/ajuster")
    public ResponseEntity<NutritionService.AjustementResultat> ajusterNutrition(
            @RequestBody NutritionService.AjustementRequest request) {

        var resultat = nutritionService.ajuster(request);

        return ResponseEntity.ok(resultat);
    }
}