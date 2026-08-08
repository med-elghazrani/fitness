package com.protosirius.backend.repository;

import com.protosirius.backend.entity.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingSessionRep extends JpaRepository<TrainingSession, Long> {
    List<TrainingSession> findByAthleteIdOrderBySessionDateDesc(Long athleteId); // newest 



    List<TrainingSession> findTop3ByAthleteIdOrderBySessionDateDesc(Long athleteId); // 3 most recent session for athlete
}
