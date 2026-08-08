package com.protosirius.backend.repository;

import com.protosirius.backend.entity.SessionExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionExerciseRep extends JpaRepository<SessionExercise, Long> {
    List<SessionExercise> findBySessionId(Long sessionId); // chaque seance a un id
    List<SessionExercise> findBySessionAthleteId(Long athleteId); // athlete a plusieurs seance
}
