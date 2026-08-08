package com.protosirius.backend.controller;

import java.util.Calendar;

import com.protosirius.backend.entity.User;

public class AccountResponse {
    private int id;
    private String email;   
    private String message;
    private String nom;
    private String prenom;
    private double poids;
    private double taille;
    private String sex;
    private Integer anneeNaissance;

    public static AccountResponse fromUser(User user) {
        AccountResponse response = new AccountResponse();
        response.id=user.getId();
        response.email=user.getEmail();
        response.nom=user.getNom();
        response.prenom=user.getPrenom();
        response.message="Infos du compte mises à jour";
        response.poids=user.getPoids();
        response.taille=user.getTaille();
        response.sex = user.getSex() != null ? user.getSex().name() : null;

        if (user.getDateNaissance() != null) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(user.getDateNaissance());
            response.anneeNaissance = calendar.get(Calendar.YEAR);
        }
        return response;}







        

    public int getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }
    public String getMessage() {
        return message;
    }
    public String getNom() {
        return nom;
    }
    public String getPrenom() {
        return prenom;
    }

    public double getPoids() {
        return poids;
    }
    public double getTaille() {
        return taille;
    }
    public String getSex() {
        return sex;
    }
    public Integer getAnneeNaissance() {
        return anneeNaissance;
    }
}
