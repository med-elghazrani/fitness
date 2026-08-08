package com.protosirius.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.protosirius.backend.entity.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    List<Ingredient> findTop3ByCarbsPer100gLessThanOrderByProteinsPer100gDesc(double carbsMax);
    List<Ingredient> findTop3ByProteinsPer100gLessThanOrderByCarbsPer100gDesc(double proteinsMax);
    List<Ingredient> findTop1ByOrderByFatsPer100gDesc();
}
