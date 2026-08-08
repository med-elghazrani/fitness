package com.protosirius.backend.controller;

import java.time.Instant;

import com.protosirius.backend.entity.Measure;

public class MeasureSummaryResponse {

    private Long id;
    private double poidsKg;
    private Instant date;
    private double bmi;

    public static MeasureSummaryResponse fromMeasure(Measure m) {
        MeasureSummaryResponse response = new MeasureSummaryResponse();
        response.id = m.getId();
        response.poidsKg = m.getPoidsKg();
        response.date = m.getDate();
        response.bmi = m.getBmi();
        return response;
    }

    public Long getId() {
        return id;
    }
    public double getPoidsKg() {
        return poidsKg;
    }
    public Instant getDate() {
        return date;
    }   
    public double getBmi() {
        return bmi;
    }
    
}
