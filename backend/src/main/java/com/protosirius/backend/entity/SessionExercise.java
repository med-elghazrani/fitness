package com.protosirius.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "session_exercise")
public class SessionExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private TrainingSession session;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "intensity", nullable = false)
    private String intensity;

    @Column(name = "calories_burned", nullable = false)
    private Double caloriesBurned;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public TrainingSession getSession() { return session; }
    public void setSession(TrainingSession session) { this.session = session; }

    public Exercise getExercise() { return exercise; }


    public void setExercise(Exercise exercise) { this.exercise = exercise; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getIntensity() { return intensity; }


    public void setIntensity(String intensity) { this.intensity = intensity; }

    public Double getCaloriesBurned() { return caloriesBurned; }
    
    public void setCaloriesBurned(Double caloriesBurned) { this.caloriesBurned = caloriesBurned; }
}
