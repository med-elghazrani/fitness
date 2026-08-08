package com.protosirius.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.protosirius.backend.entity.NutritionPlanHistory;





public interface NutritionPlanHistoryRepository extends JpaRepository<NutritionPlanHistory, Long> {
    List<NutritionPlanHistory> findByUserIdOrderByDateDesc(Integer userId);
}
