package com.protosirius.backend.controller;

import com.protosirius.backend.entity.Sex;

public record RegisterRequest(
        String nom,
        String prenom,
        String email,
        String motDePasse,
        int anneeNaissance,
        Sex sex,
        double poids,
        double taille
) {}
