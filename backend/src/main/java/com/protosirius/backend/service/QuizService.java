package com.protosirius.backend.service;

import org.springframework.stereotype.Service;

import com.protosirius.backend.entity.ActivityLevel;
import com.protosirius.backend.entity.FitnessGoal;
import com.protosirius.backend.entity.Sex;

@Service
public class QuizService {

    public ProfilData creerProfilData(QuizRequest request) {
        return new ProfilData(
                request.anneeNaissance(),
                request.sex(),
                request.poids(),
                request.taille(),
                request.activityLevel(),
                request.goal()
        );
    }

    public record QuizRequest(  int anneeNaissance,   Sex sex,   double poids,   double taille,   ActivityLevel activityLevel,   FitnessGoal goal
    ) {}

    public record ProfilData(  int anneeNaissance,   Sex sex,   double poids,   double taille,   ActivityLevel activityLevel,   FitnessGoal goal  ) {}





}