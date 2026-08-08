package com.protosirius.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.entity.Macronutrients;
import com.protosirius.backend.service.PlanAlimentaireService;

@RestController
@RequestMapping("/api/fitness")
public class IngredientPlanController {

    private final PlanAlimentaireService planAlimentaireService;



    public IngredientPlanController(PlanAlimentaireService planAlimentaireService) {
        this.planAlimentaireService = planAlimentaireService;
    }


    @PostMapping("/ingredients/plan")
    public ResponseEntity<PlanAlimentaireService.PlanAlimentaireResultat> genererPlan(@RequestBody PlanRequest request) {

        Macronutrients cibles = new Macronutrients(0, request.proteines(), request.glucides(), request.lipides());
        
        var resultat = planAlimentaireService.genererPlan(cibles);

        return ResponseEntity.ok(resultat);}




    public record PlanRequest(double proteines, double glucides, double lipides) {}}
