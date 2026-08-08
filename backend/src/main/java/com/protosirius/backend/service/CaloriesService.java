package com.protosirius.backend.service;

import com.protosirius.backend.dto.CaloriesSessionRequest;
import com.protosirius.backend.entity.Athlete;

import com.protosirius.backend.entity.Exercise;
import com.protosirius.backend.entity.SessionExercise;
import com.protosirius.backend.entity.TrainingSession;

import com.protosirius.backend.repository.AthleteRep;
import com.protosirius.backend.repository.ExerciseRep;
import com.protosirius.backend.repository.SessionExerciseRep;
import com.protosirius.backend.repository.TrainingSessionRep;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CaloriesService {

    private final AthleteRep athleteRepository;
    private final ExerciseRep exerciseRepository;
    private final TrainingSessionRep trainingSessionRepository;
    private final SessionExerciseRep sessionExerciseRepository;

    public CaloriesService(
            AthleteRep athleteRepository,
            ExerciseRep exerciseRepository,
            TrainingSessionRep trainingSessionRepository,
            SessionExerciseRep sessionExerciseRepository
    ) {


        this.athleteRepository = athleteRepository;
        this.exerciseRepository = exerciseRepository;

        this.trainingSessionRepository = trainingSessionRepository;
        this.sessionExerciseRepository = sessionExerciseRepository;
    }

    @Transactional
    public Map<String, Object> calculateAndSave(CaloriesSessionRequest request) {

        Athlete athlete = athleteRepository.findById(request.getAthleteId())
                .orElseThrow(() -> new IllegalArgumentException("Athlète introuvable"));

        if (request.getExercises() == null || request.getExercises().isEmpty()) {
            throw new IllegalArgumentException("La seance doit contenir au moins un exercice");
        }

        List<Exercise> exercises = new ArrayList<>();
        List<Double> caloriesList = new ArrayList<>();

        double totalCalories = 0;
        int totalDuration = 0;

        String sessionIntensity = "LOW";

        for (CaloriesSessionRequest.ExerciseInput input : request.getExercises()) {

            Exercise exercise = exerciseRepository.findById(input.getExerciseId())
                    .orElseThrow(() -> new IllegalArgumentException("Exercice introuvable"));

            if (input.getDurationMinutes() == null || input.getDurationMinutes() <= 0) {
                throw new IllegalArgumentException("Duree incorrecte");
            }

            String intensity = input.getIntensity().toUpperCase();

            double intensityFactor = getIntensityFactor(intensity);

            double calories =
                    exercise.getMetBase()
                    * 3.5
                    * athlete.getWeightKg()
                    / 200
                    * input.getDurationMinutes()
                    * intensityFactor;

            calories = round(calories);

            exercises.add(exercise);
            caloriesList.add(calories);

            totalCalories = totalCalories + calories;
            totalDuration = totalDuration + input.getDurationMinutes();

            if (intensity.equals("HIGH")) {
                sessionIntensity = "HIGH";
            } else if (intensity.equals("MEDIUM") && !sessionIntensity.equals("HIGH")) {
                sessionIntensity = "MEDIUM";
            }
        }

        totalCalories = round(totalCalories);

        TrainingSession session = new TrainingSession();

        session.setAthlete(athlete);

        if (request.getSessionDate() == null) {
            session.setSessionDate(LocalDate.now());
        } else {
            session.setSessionDate(request.getSessionDate());
        }

        session.setTotalCalories(totalCalories);
        session.setDurationMinutes(totalDuration);
        session.setSessionIntensity(sessionIntensity);
        session.setNotes("Calories calculees automatiquement");

        trainingSessionRepository.save(session);

        List<Map<String, Object>> exerciseResults = new ArrayList<>();

        for (int i = 0; i < request.getExercises().size(); i++) {

            CaloriesSessionRequest.ExerciseInput input =
                    request.getExercises().get(i);

            Exercise exercise = exercises.get(i);

            double calories = caloriesList.get(i);

            SessionExercise sessionExercise = new SessionExercise();

            sessionExercise.setSession(session);
            sessionExercise.setExercise(exercise);
            sessionExercise.setDurationMinutes(input.getDurationMinutes());
            sessionExercise.setIntensity(input.getIntensity().toUpperCase());
            sessionExercise.setCaloriesBurned(calories);

            sessionExerciseRepository.save(sessionExercise);

            Map<String, Object> exerciseResult = new HashMap<>();

            exerciseResult.put("exerciseId", exercise.getId());
            exerciseResult.put("name", exercise.getName());
            exerciseResult.put("metBase", exercise.getMetBase());
            exerciseResult.put("durationMinutes", input.getDurationMinutes());
            exerciseResult.put("intensity", input.getIntensity().toUpperCase());
            exerciseResult.put("calories", calories);

            exerciseResults.add(exerciseResult);
        }

        Map<String, Object> result = new HashMap<>();

        result.put("sessionId", session.getId());
        result.put("sessionDate", session.getSessionDate());
        result.put("athleteId", athlete.getId());
        result.put("athleteName", athlete.getFullName());
        result.put("weightKg", athlete.getWeightKg());
        result.put("totalDuration", totalDuration);
        result.put("totalCalories", totalCalories);
        result.put("exercises", exerciseResults);

        return result;
    }

    private double getIntensityFactor(String intensity) {

        if (intensity.equals("LOW")) {
            return 0.85;
        }

        if (intensity.equals("MEDIUM")) {
            return 1.0;
        }

        if (intensity.equals("HIGH")) {
            return 1.15;
        }

        throw new IllegalArgumentException("Intensite incorrecte");
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}