package com.protosirius.backend.repository;

import com.protosirius.backend.entity.MuscleGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MuscleGroupRep extends JpaRepository<MuscleGroup, Long> {
}
