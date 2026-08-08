package com.protosirius.backend.entity;


public enum ActivityLevel {  SEDENTAIRE(1.2),   MODERE(1.55),   ACTIF(1.75),   TRES_ACTIF(1.9);

    private final double factor;

    ActivityLevel(double factor) {
        this.factor = factor;
    }

    public double getFactor() {
        return factor;
    }
}
