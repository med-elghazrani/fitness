package com.protosirius.backend.service;

import com.protosirius.backend.service.*;
import com.protosirius.backend.entity.*;

import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class MicronutritionService {

    public MicroResultat calculer(QuizService.ProfilData profil) {

        int age = LocalDate.now().getYear() - profil.anneeNaissance();
        Sex sex = profil.sex();
        double poids = profil.poids();
        FitnessGoal goal = profil.goal();

        double vitamineA = (sex == Sex.MALE) ? 800 : 600;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS) {
            vitamineA += 80;
        } else {
            vitamineA -= 40;
        }

        double vitamineB12 = 2.4;
        if (age >= 50) vitamineB12 = 2.8;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS)
            vitamineB12 += 0.4;

        double vitamineC = (sex == Sex.MALE) ? 90 : 75;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS) {
            vitamineC += 35;
        } else {
            vitamineC += 10;
        }

        double vitamineD = 15;
        if (age >= 60) vitamineD = 20;

        double vitamineE = 15.0;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS)
            vitamineE += 2.0;

        double fer = 8.0;
        if (sex == Sex.FEMALE && age < 50) fer = 18.0;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS)
            fer += 2.0;

        double calcium = 1000;
        if (age >= 50) calcium = 1200;

        double magnesium = poids * 4.0;
        double maxMag = (sex == Sex.MALE) ? 420 : 320;
        if (magnesium > maxMag) magnesium = maxMag;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS) {
            magnesium += 20;
        } else {
            magnesium -= 10;
        }

        double zinc = (sex == Sex.MALE) ? 11.0 : 8.0;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS)
            zinc += 2.0;

        double sodium = 2300;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS) {
            sodium += 200;
        } else {
            sodium -= 300;
        }

        double potassium = 3500;
        if (goal == FitnessGoal.GAIN_MASSE_MUSCULAIRE || goal == FitnessGoal.GAIN_POIDS) {
            potassium += 500;
        } else {
            potassium += 200;
        }

        Micronutrients micros = new Micronutrients(
            vitamineA, vitamineB12, vitamineC, vitamineD, vitamineE,
            fer, calcium, magnesium, zinc, sodium, potassium
        );

        return new MicroResultat(age, micros);
    }

    public record MicroResultat(int age, Micronutrients micronutrients) {}
}
