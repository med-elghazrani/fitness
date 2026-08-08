package com.protosirius.backend.entity;

public class IngredientQuantite {

    private String nom;
    private double grammes;
    private double proteines;
    private double glucides;
    private double lipides;
    private double calories;


    public IngredientQuantite(String nom, double grammes, double proteines, double glucides, double lipides, double calories) {
        this.nom = nom;
        this.grammes = grammes;
        this.proteines = proteines;
        this.glucides = glucides;
        this.lipides = lipides;
        this.calories = calories;
    }

    public String getNom() { return nom; }
    public double getGrammes() { return grammes; }
    public double getProteines() { return proteines; }

    public double getGlucides() { return glucides; }
    public double getLipides() { return lipides; }
    public double getCalories() { return calories; }

}
