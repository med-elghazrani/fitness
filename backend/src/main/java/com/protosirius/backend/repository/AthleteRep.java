package com.protosirius.backend.repository;

import com.protosirius.backend.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRep extends JpaRepository<Athlete, Long> {
}
