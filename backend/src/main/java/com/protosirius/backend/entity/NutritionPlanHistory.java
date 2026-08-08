package com.protosirius.backend.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "nutrition_plan_history")
public class NutritionPlanHistory {

   
   
   
   
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
   
    @Column(name = "user_id", nullable = false)
    private Integer userId;

   
   
    @Column(nullable = false)
    private Instant date;

    
    
    
    private double calories;
    private double proteines;
    private double glucides;
    private double lipides;


    @PrePersist
    public void prePersist() {if (date == null) {date = Instant.now();}}





    

    public Long getId() { return id; }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Instant getDate() { return date; }

    public double getCalories() { return calories; }
    public void setCalories(double calories) { this.calories = calories; }

    public double getProteines() { return proteines; }
    public void setProteines(double proteines) { this.proteines = proteines; }

    public double getGlucides() { return glucides; }
    public void setGlucides(double glucides) { this.glucides = glucides; }

    public double getLipides() { return lipides; }
    public void setLipides(double lipides) { this.lipides = lipides; }
}
