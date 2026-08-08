package com.protosirius.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.protosirius.backend.entity.Ingredient;
import com.protosirius.backend.entity.IngredientQuantite;
import com.protosirius.backend.repository.IngredientRepository;

@Service
public class IngredientSelectionService {

    private static final double SEUIL_CROISE = 5.00;


    private final IngredientRepository ingredientRepository;

    public IngredientSelectionService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }






    public List<IngredientQuantite> creerCollectionProteines(double proteinesCibleGrammes) {List<Ingredient> ingredients = ingredientRepository.findTop3ByCarbsPer100gLessThanOrderByProteinsPer100gDesc(SEUIL_CROISE);

        List<IngredientQuantite> collection = new ArrayList<>();
        double cibleParIngredient = proteinesCibleGrammes / ingredients.size();

        for (Ingredient ingredient : ingredients) {
            double grammes = (cibleParIngredient/ingredient.getProteinsPer100g()) * 100;
            collection.add(construireQuantite(ingredient, grammes));}
        return collection; }








    public List<IngredientQuantite> creerCollectionGlucides(double glucidesCiblesGrammes) {List<Ingredient> ingredients = ingredientRepository.findTop3ByProteinsPer100gLessThanOrderByCarbsPer100gDesc(SEUIL_CROISE);

        List<IngredientQuantite> collection = new ArrayList<>();
        double cibleParIngredient = glucidesCiblesGrammes / ingredients.size();

        for (Ingredient ingredient : ingredients) { double grammes = (cibleParIngredient/ingredient.getCarbsPer100g()) * 100;
            collection.add(construireQuantite(ingredient, grammes));}
        return collection;}






    private IngredientQuantite construireQuantite(Ingredient ingredient, double grammes) { double proteines = grammes * ingredient.getProteinsPer100g()/100;
        double glucides = grammes * ingredient.getCarbsPer100g() / 100;
        double lipides = grammes * ingredient.getFatsPer100g() / 100;
        double calories = grammes * ingredient.getCaloriesPer100g()/100;
        return new IngredientQuantite(ingredient.getName(), grammes, proteines, glucides, lipides, calories);}
}
