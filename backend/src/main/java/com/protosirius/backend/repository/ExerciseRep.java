package com.protosirius.backend.repository;

import com.protosirius.backend.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRep extends JpaRepository<Exercise, Long> {
    List<Exercise> findByMuscleGroupNameIgnoreCase(String name); // le nom de groupe
}
