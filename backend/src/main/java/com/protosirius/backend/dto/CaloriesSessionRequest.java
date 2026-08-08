package com.protosirius.backend.dto;

import java.time.LocalDate;
import java.util.List;

public class CaloriesSessionRequest {

    private Long athleteId;
    private LocalDate sessionDate;
    private List<ExerciseInput> exercises;

    public Long getAthleteId() {
        return athleteId;
    }

    public void setAthleteId(Long athleteId) {
        this.athleteId = athleteId;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
    }

    public List<ExerciseInput> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseInput> exercises) {
        this.exercises = exercises;
    }

    public static class ExerciseInput {

        private Long exerciseId;
        private String intensity;
        private Integer durationMinutes;

        public Long getExerciseId() {
            return exerciseId;
        }

        public void setExerciseId(Long exerciseId) {
            this.exerciseId = exerciseId;
        }

        public String getIntensity() {
            return intensity;
        }

        public void setIntensity(String intensity) {
            this.intensity = intensity;
        }

        public Integer getDurationMinutes() {
            return durationMinutes;
        }

        public void setDurationMinutes(Integer durationMinutes) {
            this.durationMinutes = durationMinutes;
        }
    }
}