package com.protosirius.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.protosirius.backend.entity.NutritionPlanHistory;
import com.protosirius.backend.repository.NutritionPlanHistoryRepository;

@Service
public class NutritionHistoryService {


    

    private final NutritionPlanHistoryRepository repository;

    public NutritionHistoryService(NutritionPlanHistoryRepository repository) { this.repository = repository;
    }






    public NutritionPlanHistory enregistrer(Integer userId, double calories, double proteines, double glucides, double lipides) {
        NutritionPlanHistory entry = new NutritionPlanHistory();
        entry.setUserId(userId);
        entry.setCalories(calories);
        entry.setProteines(proteines);
        entry.setGlucides(glucides);
        entry.setLipides(lipides);
        return repository.save(entry);
    }




    public List<NutritionPlanHistory> getHistorique(Integer userId) { return repository.findByUserIdOrderByDateDesc(userId); }
}
