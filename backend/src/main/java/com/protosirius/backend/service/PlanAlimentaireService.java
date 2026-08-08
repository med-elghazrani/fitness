package com.protosirius.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.protosirius.backend.entity.Ingredient;
import com.protosirius.backend.entity.IngredientQuantite;
import com.protosirius.backend.entity.Macronutrients;
import com.protosirius.backend.repository.IngredientRepository;

@Service
public class PlanAlimentaireService {

    

    private final IngredientSelectionService ingredientSelectionService;
    private final IngredientRepository ingredientRepository;






    public PlanAlimentaireService(IngredientSelectionService ingredientSelectionService, IngredientRepository ingredientRepository){
        this.ingredientSelectionService = ingredientSelectionService;
        this.ingredientRepository = ingredientRepository;
    }







    public PlanAlimentaireResultat genererPlan(Macronutrients cibles){

        List<IngredientQuantite> collectionProteines = ingredientSelectionService.creerCollectionProteines(cibles.getProteins());
        List<IngredientQuantite> collectionGlucides = ingredientSelectionService.creerCollectionGlucides(cibles.getCarbs());



        collectionProteines = corrigerVersCible(collectionProteines, cibles.getProteins(), true);
        collectionGlucides = corrigerVersCible(collectionGlucides, cibles.getCarbs(), false);

        List<IngredientQuantite> planCombine = combiner(collectionProteines, collectionGlucides);

        completerLipides(planCombine, cibles.getFats());

        return construireResultat(planCombine);}





    private List<IngredientQuantite> corrigerVersCible(List<IngredientQuantite> collection, double cible, boolean pourProteines) {double totalActuel = 0;

        for (IngredientQuantite item : collection){
            totalActuel += pourProteines ? item.getProteines() : item.getGlucides();}
        if (totalActuel == 0) {return collection;}





        double ratio = cible/totalActuel;




        List<IngredientQuantite> corrigee = new ArrayList<>();

        for (IngredientQuantite item : collection){
            corrigee.add(new IngredientQuantite(
                    item.getNom(),item.getGrammes()*ratio,item.getProteines()*ratio,
                    item.getGlucides()*ratio,item.getLipides() * ratio,item.getCalories()*ratio));}

        return corrigee;}




    private List<IngredientQuantite> combiner(List<IngredientQuantite> collectionProteines, List<IngredientQuantite> collectionGlucides) {

        List<IngredientQuantite> combinee = new ArrayList<>(collectionProteines);

        for (IngredientQuantite item : collectionGlucides) {
            int indexExistant = -1;
            for (int i = 0; i < combinee.size(); i++) {
                if (combinee.get(i).getNom().equals(item.getNom())) {indexExistant = i;
                    break;} }

            if (indexExistant == -1){combinee.add(item);} 
            else {
                IngredientQuantite existant = combinee.get(indexExistant);
                combinee.set(indexExistant, new IngredientQuantite(
                        existant.getNom(), existant.getGrammes() + item.getGrammes(), existant.getProteines() + item.getProteines(),
                        existant.getGlucides() + item.getGlucides(), existant.getLipides() + item.getLipides(),existant.getCalories() + item.getCalories()));
            }} return combinee;}









    private void completerLipides(List<IngredientQuantite> plan, double cibleLipides) {

        double totalLipidesActuel = 0;
        for (IngredientQuantite item : plan) {
            totalLipidesActuel += item.getLipides();}


        double manque = cibleLipides - totalLipidesActuel;
        if (manque <= 0){return;}

        List<Ingredient> sourceLipides = ingredientRepository.findTop1ByOrderByFatsPer100gDesc();


        if (sourceLipides.isEmpty()){return;}

        Ingredient huile = sourceLipides.get(0);

        double grammesAjoutees = (manque / huile.getFatsPer100g())*100;

        double proteines = grammesAjoutees * huile.getProteinsPer100g() / 100;
        double glucides = grammesAjoutees * huile.getCarbsPer100g()/ 100;
        double lipides = grammesAjoutees * huile.getFatsPer100g()/ 100;
        double calories = grammesAjoutees * huile.getCaloriesPer100g()/100;

        plan.add(new IngredientQuantite(huile.getName(), grammesAjoutees, proteines, glucides, lipides, calories));}



    private PlanAlimentaireResultat construireResultat(List<IngredientQuantite> plan) {

        double totalProteines =0;
        double totalGlucides =0;
        double totalLipides =0;
        double totalCalories =0;

        for (IngredientQuantite item : plan) {
            totalProteines += item.getProteines();
            totalGlucides += item.getGlucides();
            totalLipides += item.getLipides();
            totalCalories += item.getCalories();}

     return new PlanAlimentaireResultat(plan, totalProteines, totalGlucides, totalLipides, totalCalories);}




    public record PlanAlimentaireResultat(
            List<IngredientQuantite> ingredients,
            double totalProteines,
            double totalGlucides,
            double totalLipides,
            double totalCalories
    ) {}}
