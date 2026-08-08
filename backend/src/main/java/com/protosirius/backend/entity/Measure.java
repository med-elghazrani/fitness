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
@Table(name = "MesuresBMI")
public class Measure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private double poidsKg;

    @Column
    private double tailleCm;

    @Column
    private double bmi;

    @Column
    private String categorie;

    @Column
    private Instant date;

    @Column(name="user_id")
    private Integer userId;

    public Measure() {
    }

    public Long getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    @PrePersist
    public void prePersist() {
        if (date == null) {
            date = Instant.now();
        }
    }
    

    public double getPoidsKg() {
        return poidsKg;
    }          

    public double getTailleCm() {
        return tailleCm;
    }   

    public double getBmi() {
        return bmi;
    }

    public String getCategorie() {
        return categorie;
    }

    public Instant getDate() {
        return date;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setPoidsKg(double poidsKg) {
        this.poidsKg = poidsKg;
    }

    public void setTailleCm(double tailleCm) {
        this.tailleCm = tailleCm;
    }

    public void setBmi(double bmi) {
        this.bmi = bmi;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    

}
