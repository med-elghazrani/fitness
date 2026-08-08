package com.protosirius.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "training_session")
public class TrainingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne

    @JoinColumn(name = "athlete_id", nullable = false)
    private Athlete athlete;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "total_calories", nullable = false)
    
    private Double totalCalories;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "notes")
    private String notes;

    @ManyToOne

    @JoinColumn(name = "focus_muscle_group_id")
    private MuscleGroup focusMuscleGroup;

    @Column(name = "session_intensity")
    private String sessionIntensity;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Athlete getAthlete() { return athlete; }
    public void setAthlete(Athlete athlete) { this.athlete = athlete; }

    public LocalDate getSessionDate() { return sessionDate; }
    public void setSessionDate(LocalDate sessionDate) { this.sessionDate = sessionDate; }

    public Double getTotalCalories() { return totalCalories; }
    public void setTotalCalories(Double totalCalories) { this.totalCalories = totalCalories; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public MuscleGroup getFocusMuscleGroup() { return focusMuscleGroup; }
    public void setFocusMuscleGroup(MuscleGroup focusMuscleGroup) { this.focusMuscleGroup = focusMuscleGroup; }

    public String getSessionIntensity() { return sessionIntensity; }
    public void setSessionIntensity(String sessionIntensity) { this.sessionIntensity = sessionIntensity; }
}
