package com.protosirius.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.service.MicronutritionService;
import com.protosirius.backend.service.QuizService;

@RestController
@RequestMapping("/api/fitness")
public class MicronutritionController {

    private final QuizService quizService;
    private final MicronutritionService micronutritionService;

    public MicronutritionController(QuizService quizService, MicronutritionService micronutritionService) {
        this.quizService = quizService;
        this.micronutritionService = micronutritionService;
    }

    @PostMapping("/micro")
    public ResponseEntity<MicronutritionService.MicroResultat> calculerMicro(
            @RequestBody QuizService.QuizRequest request) {

        var profil = quizService.creerProfilData(request);
        var res = micronutritionService.calculer(profil);
        return ResponseEntity.ok(res);
    }
}
