package com.protosirius.backend.controller;

public class BmiRequest {
    private double poidsKg;
    private double tailleCm;

    public BmiRequest() {
    }

    public double getPoidsKg() {
        return poidsKg;
    }

    public void setPoidsKg(double poidsKg) {
        this.poidsKg = poidsKg;
    }

    public double getTailleCm() {
        return tailleCm;
    }

    public void setTailleCm(double tailleCm) {
        this.tailleCm = tailleCm;
    }

}
