package com.protosirius.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.protosirius.backend.entity.Measure;
import com.protosirius.backend.repository.MeasureRepository;

@Service
public class BmiService {
    private final MeasureRepository repository;

    public BmiService(MeasureRepository repository) {
        this.repository = repository;
    }

    public Measure MesureBMI(double poidsKg, double tailleCm) {
        if (tailleCm <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Eyoo , ta taille doit être supérieure à zéro !");
        }
        if (poidsKg <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Eyoo , ton poids doit être supérieur à zéro !");
        }

        double tailleM = tailleCm / 100.0;
        double bmi = Math.round(poidsKg / (tailleM * tailleM));

        Measure measure = new Measure();
        measure.setPoidsKg(poidsKg);
        measure.setTailleCm(tailleCm);
        measure.setBmi(bmi);
        measure.setCategorie(categoriserBMI(bmi));

        return repository.save(measure);
    }

    private String categoriserBMI(double bmi) {
        if (bmi < 18.5) {
            return "Insuffisance pondérale";
        } else if (bmi < 25) {
            return "Poids normal";
        } else if (bmi < 30) {
            return "Surpoids";
        } else {
            return "Obésité";
        }
    }

    public Measure getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mesure non trouvée"));
    }

    public Measure MesureBMIForUser(Integer userId, double poidsKg, double tailleCm) {
        Measure measure = MesureBMI(poidsKg, tailleCm);
        measure.setUserId(userId);
        return repository.save(measure);
    }
}
