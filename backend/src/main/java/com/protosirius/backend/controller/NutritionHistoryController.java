package com.protosirius.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.protosirius.backend.entity.NutritionPlanHistory;
import com.protosirius.backend.service.NutritionHistoryService;




@RestController
@RequestMapping("/api/account/{userId}/nutrition-history")
public class NutritionHistoryController {

    private final NutritionHistoryService nutritionHistoryService;


    
    public NutritionHistoryController(NutritionHistoryService nutritionHistoryService) { this.nutritionHistoryService = nutritionHistoryService;}


    @PostMapping

    //    public NutritionPlanHistory enregistrer(@PathVariable Integer uerId, @RequestBody SaveNutritionRequest request) {


    public NutritionPlanHistory enregistrer(@PathVariable Integer userId, @RequestBody SaveNutritionRequest request) {
        return nutritionHistoryService.enregistrer(userId, request.calories(), request.proteines(), request.glucides(), request.lipides()); }





    @GetMapping
    //public List<NutritionPlanHistory> getHistorique(@PathVariable Integer userId) {return nutritionHistoryService.getHistorique(userId); }

    public List<NutritionPlanHistory> getHistorique(@PathVariable Integer userId) {return nutritionHistoryService.getHistorique(userId); }





    public record SaveNutritionRequest(double calories, double proteines, double glucides, double lipides) {}
}
