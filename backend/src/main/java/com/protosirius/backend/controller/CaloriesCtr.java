package com.protosirius.backend.controller;

import com.protosirius.backend.dto.CaloriesSessionRequest;
import com.protosirius.backend.entity.Exercise;
import com.protosirius.backend.entity.MuscleGroup;
import com.protosirius.backend.repository.ExerciseRep;
import com.protosirius.backend.repository.MuscleGroupRep;
import com.protosirius.backend.service.CaloriesService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/calories")
public class CaloriesCtr {

    private final MuscleGroupRep muscleGroupRepository;
    private final ExerciseRep exerciseRepository;
    private final CaloriesService caloriesService;

    public CaloriesCtr(
            MuscleGroupRep muscleGroupRepository,
            ExerciseRep exerciseRepository,
            CaloriesService caloriesService
    ) {
        this.muscleGroupRepository = muscleGroupRepository;
        this.exerciseRepository = exerciseRepository;
        
        this.caloriesService = caloriesService;
    }

    @GetMapping("/muscle-groups")
    public List<MuscleGroup> muscleGroups() {
        return muscleGroupRepository.findAll();
    }

    @GetMapping("/exercises")
    public List<Exercise> exercises(@RequestParam String muscleGroup) {


        return exerciseRepository.findByMuscleGroupNameIgnoreCase(muscleGroup);
    }

    @PostMapping("/session")
    public Map<String, Object> saveSession(
            @RequestBody CaloriesSessionRequest request
    ) {
        return caloriesService.calculateAndSave(request);
    }

    @ExceptionHandler(IllegalArgumentException.class)


    @ResponseStatus(HttpStatus.BAD_REQUEST)

    public Map<String, String> error(IllegalArgumentException exception) {


        return Map.of("error", exception.getMessage());


    }
}