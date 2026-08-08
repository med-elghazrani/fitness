package com.protosirius.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredient")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "proteins_per_100g", nullable = false)
    private double proteinsPer100g;

    @Column(name = "carbs_per_100g", nullable = false)
    private double carbsPer100g;

    @Column(name = "fats_per_100g", nullable = false)
    private double fatsPer100g;

    @Column(name = "calories_per_100g", nullable = false)
    private double caloriesPer100g;

    public Ingredient() {
    }



    public Ingredient(String name, double proteinsPer100g, double carbsPer100g, double fatsPer100g, double caloriesPer100g) {
        this.name = name;
        this.proteinsPer100g = proteinsPer100g;
        this.carbsPer100g = carbsPer100g;
        this.fatsPer100g = fatsPer100g;
        this.caloriesPer100g = caloriesPer100g;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getProteinsPer100g() { return proteinsPer100g; }
    public void setProteinsPer100g(double proteinsPer100g) { this.proteinsPer100g = proteinsPer100g; }

    public double getCarbsPer100g() { return carbsPer100g; }
    public void setCarbsPer100g(double carbsPer100g) { this.carbsPer100g = carbsPer100g; }

    public double getFatsPer100g() { return fatsPer100g; }
    public void setFatsPer100g(double fatsPer100g) { this.fatsPer100g = fatsPer100g; }


    public double getCaloriesPer100g() { return caloriesPer100g; }
    public void setCaloriesPer100g(double caloriesPer100g) { this.caloriesPer100g = caloriesPer100g; }
}
