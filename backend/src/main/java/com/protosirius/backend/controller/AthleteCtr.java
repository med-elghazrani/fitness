package com.protosirius.backend.controller;

import com.protosirius.backend.entity.Athlete;
import com.protosirius.backend.entity.TrainingSession;
import com.protosirius.backend.repository.AthleteRep;
import com.protosirius.backend.repository.TrainingSessionRep;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AthleteCtr {

    private final AthleteRep athleteRepository;


    private final TrainingSessionRep trainingSessionRepository;

    public AthleteCtr(  AthleteRep athleteRepository, TrainingSessionRep trainingSessionRepository) {
        this.athleteRepository =athleteRepository;
        this.trainingSessionRepository =  trainingSessionRepository;
    }

    @GetMapping("/athletes")
    public List<Athlete> athletes() {
        return athleteRepository.findAll();
    }

    @GetMapping("/athletes/{id}")
    public Athlete athlete(@PathVariable Long id) {

        return athleteRepository.findById(id).orElseThrow();
    }

    @GetMapping("/athletes/{id}/sessions")
    public List<TrainingSession> sessions(@PathVariable Long id) {


        return trainingSessionRepository.findByAthleteIdOrderBySessionDateDesc(id); // sesions , newest --> oldest
    }
}
