package com.protosirius.backend.entity;

public class Micronutrients {

    private double vitamineA;
    private double vitamineB12;
    private double vitamineC;
    private double vitamineD;
    private double vitamineE;
    private double fer;
    private double calcium;
    private double magnesium;
    private double zinc;
    private double sodium;
    private double potassium;

    public Micronutrients(double vA, double vB12, double vC, double vD, double vE,
        double fer, double calcium, double magnesium, double zinc,
        double sodium, double potassium) {
        this.vitamineA = vA;
        this.vitamineB12 = vB12;
        this.vitamineC = vC;
        this.vitamineD = vD;
        this.vitamineE = vE;
        this.fer = fer;
        this.calcium = calcium;
        this.magnesium = magnesium;
        this.zinc = zinc;
        this.sodium = sodium;
        this.potassium = potassium;
    }

    public double getvitamineA() { return vitamineA; }
    public double getvitamineB12() { return vitamineB12; }
    public double getvitamineC() { return vitamineC; }
    public double getvitamineD() { return vitamineD; }
    public double getvitamineE() { return vitamineE; }
    public double getFer() { return fer; }
    public double getCalcium() { return calcium; }
    public double getMagnesium() { return magnesium; }
    public double getZinc() { return zinc; }
    public double getSodium() { return sodium; }
    public double getPotassium() { return potassium; }

    @Override
    public String toString() {
        return "Micronutrients{" +
            "vitamineA=" + vitamineA +
            ", vitamineB12=" + vitamineB12 +
            ", vitamineC=" + vitamineC +
            ", fer=" + fer +
            ", calcium=" + calcium +
            '}';
    }
}
