package com.protosirius.backend.service;

import com.protosirius.backend.entity.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class NutritionService {








    public CalculResultat calculer(QuizService.ProfilData profil) {

        int age = LocalDate.now().getYear() - profil.anneeNaissance();

        double bmr = 10 * profil.poids()          + 6.25 * (profil.taille() * 100)      - 5 * age      + (profil.sex() == Sex.MALE ? 5 : -161);

        double tdee = bmr * profil.activityLevel().getFactor();

        switch (profil.goal()) {
            case GAIN_POIDS, GAIN_MASSE_MUSCULAIRE -> tdee += 300;
            case PERTE_POIDS, PERTE_GRASSE -> tdee -= 400;
        }

        double bmi = profil.poids() / (profil.taille() * profil.taille());

        Macronutrients macros = construireMacronutriments(profil.poids(), tdee);

        return new CalculResultat(bmr, tdee, bmi, macros);
    }












    public AjustementResultat ajuster(AjustementRequest request) {


        double tauxHebdomadaire = (request.nouveauPoids() - request.poidsActuel()) * (7.0 / 10.0);
        boolean ajustementNecessaire = false;

        String message = "résultats satisfaisants. Continuez ainsi!   :) ";

        double nouveauTdee = request.tdeeActuel();




        if (request.goal() == FitnessGoal.GAIN_POIDS) {
            if (tauxHebdomadaire > 0.6) {
                nouveauTdee -= 200;
                ajustementNecessaire = true;
                message = "prise de poids trop rapide (>0.5kg/semaaine). minimiser le défi calorique svp.";



            } else if (tauxHebdomadaire < 0.4) {
                nouveauTdee += 200;
                ajustementNecessaire = true;
                message = "prise de poids trop lente (< 0.5kg/semaine). augmenter le défi calorique.";
            }




        } else if (request.goal() == FitnessGoal.GAIN_MASSE_MUSCULAIRE) {
            if (tauxHebdomadaire > 0.5) {
                nouveauTdee -= 150;
                ajustementNecessaire = true;
                message = "gain rapide (> 0.5kg/semaine), risque de prise de gras. minimiser le défi.";



            } else if (tauxHebdomadaire < 0.25) {
                nouveauTdee += 150;
                ajustementNecessaire = true;
                message = "gain musculaire trop lent ou poids stable. augmenter le défi.";
            }




        } else {
            if (tauxHebdomadaire < -1.0) {
                nouveauTdee += 200;
                ajustementNecessaire = true;
                message = "perte trop rapide. augmentation des calories par sécurité.";



            } else if (tauxHebdomadaire > -0.2) {
                nouveauTdee -= 200;
                ajustementNecessaire = true;
                message = "perte trop lente ou stagnation. réduction des calories.";
            }
        }

        Macronutrients macros = ajustementNecessaire ?
                construireMacronutriments(request.nouveauPoids(), nouveauTdee) : null;




        return new AjustementResultat(
                ajustementNecessaire,
                message,
                tauxHebdomadaire,
                nouveauTdee,
                macros
        );
    }








    private Macronutrients construireMacronutriments(double poids, double tdee) {
        double proteines = poids * 2.0;
        double lipides = (tdee * 0.25) / 9;
        double glucides = (tdee - (proteines * 4 + lipides * 9)) / 4;

        return new Macronutrients(tdee, proteines, glucides, lipides);
    }

    public record CalculResultat( double bmr,      double tdee,     double bmi,     Macronutrients macronutrients ) {}

    public record AjustementRequest(   FitnessGoal goal,   double poidsActuel,   double nouveauPoids,   double tdeeActuel  ) {}

    public record AjustementResultat(  boolean ajustementNecessaire,
            String message,   double tauxHebdomadaire,   double nouveauTdee,   Macronutrients macronutrients  ) {}







}