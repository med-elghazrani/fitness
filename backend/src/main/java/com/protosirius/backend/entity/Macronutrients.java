package com.protosirius.backend.entity;

public class Macronutrients {

    private double calories;
    private double proteins;
    private double carbs;
    private double fats;

    public Macronutrients(double calories, double proteins, double carbs, double fats) {
        this.calories = calories;
        this.proteins = proteins;
        this.carbs = carbs;
        this.fats = fats;
    }



    public double getCalories() {
        return calories;
    }

    public double getProteins() {
        return proteins;
    }

    public double getCarbs() {
        return carbs;
    }

    public double getFats() {
        return fats;
    }



    @Override
    public String toString() {
        return """
        Calories : %.0f kcal
        Protéines : %.1f g
        Glucides  : %.1f g
        Lipides   : %.1f g
        """.formatted(calories, proteins, carbs, fats);
    }
}
