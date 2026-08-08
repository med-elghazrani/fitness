package com.protosirius.backend.controller;

import com.protosirius.backend.entity.SessionExercise;
import com.protosirius.backend.repository.SessionExerciseRep;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SessionCtr {

    private final SessionExerciseRep sessionExerciseRep;

    public SessionCtr(SessionExerciseRep sessionExerciseRep) {
        this.sessionExerciseRep = sessionExerciseRep;
    }

    @GetMapping("/sessions/{id}/exercises")
    public List<SessionExercise> exercises(@PathVariable Long id) {
        return sessionExerciseRep.findBySessionId(id);
    }
}
