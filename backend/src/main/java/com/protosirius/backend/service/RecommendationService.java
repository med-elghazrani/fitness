package com.protosirius.backend.service;

import com.protosirius.backend.dto.RecommendationRequest;
import com.protosirius.backend.entity.Athlete;
import com.protosirius.backend.entity.Exercise;
import com.protosirius.backend.entity.SessionExercise;
import com.protosirius.backend.entity.TrainingSession;


import com.protosirius.backend.repository.AthleteRep;
import com.protosirius.backend.repository.ExerciseRep;
import com.protosirius.backend.repository.SessionExerciseRep;
import com.protosirius.backend.repository.TrainingSessionRep;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationService {

    private final AthleteRep athleteRepository;

    private final TrainingSessionRep trainingSessionRepository;


    private final SessionExerciseRep sessionExerciseRepository;


    private final ExerciseRep exerciseRepository;

    public RecommendationService(AthleteRep athleteRepository, TrainingSessionRep trainingSessionRepository, SessionExerciseRep sessionExerciseRepository, ExerciseRep exerciseRepository) {


        this.athleteRepository =athleteRepository;

        this.trainingSessionRepository =   trainingSessionRepository;


        this.sessionExerciseRepository = sessionExerciseRepository;
        this.exerciseRepository = exerciseRepository;
    }


    // my algo : recommander la prochaine seance


    public Map<String, Object> recommendNext(Long athleteId) {

    //athlete
    Athlete athlete = athleteRepository.findById(athleteId).orElseThrow(() -> new IllegalArgumentException("Athlète introuvable")
            );

    //3 dernière séances
    List<TrainingSession> lastSessions =
            trainingSessionRepository.findTop3ByAthleteIdOrderBySessionDateDesc(athleteId);

    // Compteur pr grp musculaire
    Map<String, Integer> muscleCounts =
            new LinkedHashMap<>();

    muscleCounts.put("CHEST", 0);
    muscleCounts.put("BACK", 0);
    muscleCounts.put("LEGS", 0);
    muscleCounts.put("SHOULDERS", 0);
    muscleCounts.put("ARMS", 0);
    muscleCounts.put("CORE", 0);

    // recent ex
    Set<Long> recentExerciseIds = new HashSet<>();

    String lastIntensity = null;

    // historique
    for (int i = 0; i < lastSessions.size(); i++) {

        TrainingSession session = lastSessions.get(i);

        if (i == 0) {
            lastIntensity =pickSessionIntensity(session);
        }

        List<SessionExercise> sessionExercises = sessionExerciseRepository.findBySessionId(
                                session.getId()
                        );

        for (SessionExercise sessionExercise : sessionExercises) {

            Exercise exercise =   sessionExercise.getExercise();

            if (exercise == null) {
                continue;
            }

            recentExerciseIds.add( exercise.getId()
            );

            if (exercise.getMuscleGroup() == null) {
                continue;
            }

            String muscle = exercise.getMuscleGroup().getName().toUpperCase();

            if (muscleCounts.containsKey(muscle)) {

                muscleCounts.put(muscle, muscleCounts.get(muscle) + 1);
            }
        }
    }

    // muscle cible
    String targetMuscle;

    // aucun historique ------------------ full body
    
    if (lastSessions.isEmpty()) { targetMuscle = "FULL_BODY";

    } else {

        targetMuscle = null;

        int minimum = Integer.MAX_VALUE;

        for (Map.Entry<String, Integer> entry : muscleCounts.entrySet()) {

            if (entry.getValue() < minimum) {

                minimum =entry.getValue();

                targetMuscle = entry.getKey();
            }
        }

        if (targetMuscle == null) {
            targetMuscle ="FULL_BODY";
        }
    }

    
    List<Exercise> candidates = exerciseRepository .findByMuscleGroupNameIgnoreCase( targetMuscle);

    // securite
    if (candidates.isEmpty()) {

        candidates =exerciseRepository.findAll();
    }

    //athelete
    String goal = athlete.getGoal();

    String level =athlete.getLevel();

    String equipment =athlete.getEquipment();

    int availableMinutes =athlete.getAvailableMinutes()== null
                    ? 30
                    : athlete.getAvailableMinutes();

    // score
    
    List<Map<String, Object>> scored = new ArrayList<>();

    for (Exercise exercise : candidates) {

        int score = 0;

        
        if (exercise.getMuscleGroup()
                != null
                && exercise.getMuscleGroup().getName()
                .equalsIgnoreCase(
                        targetMuscle
                )) {

            score += 5;
        }

        
        if (matchesGoal(exercise,goal
        )) {
            score += 4;
        }

        
        if (matchesLevel(
                exercise,
                level
        )) {

            score += 3;

        } else {

            score -= 3;
        }

        
        if (matchesEquipment(
                exercise,
                equipment
        )) {

            score += 3;

        } else {

            score -= 5;
        }

        
        if (recentExerciseIds.contains(exercise.getId())) {

            score -= 3;
        }

        Map<String, Object> row = new HashMap<>();

        row.put("id",exercise.getId());

        row.put("name",exercise.getName());

        row.put("muscleGroup",
                exercise.getMuscleGroup()
                        != null
                        ? exercise.getMuscleGroup().getName()
                        : ""
        );

        row.put("difficulty",exercise.getDifficulty());

        row.put(  "score",score);

        scored.add(row);
    }

    // best score
    scored.sort(
            (a, b) ->Integer.compare( (Integer) b.get("score"), (Integer) a.get("score")  )
    );

    
    int exerciseLimit = pickExerciseLimit( availableMinutes
            );

    if (scored.size() > exerciseLimit) {

        scored = new ArrayList<>( scored.subList( 0, exerciseLimit  )  ) ;
    }

    
    int durationPerExercise = scored.isEmpty()
                    ? availableMinutes
                    : availableMinutes
                    / scored.size();

    for (Map<String, Object> exercise : scored) {

        exercise.put( "durationMinutes", durationPerExercise);
    }

    
    String intensity;

    if ("HIGH".equalsIgnoreCase( lastIntensity )) {

        
        intensity = "MEDIUM";

    } else if ("ADVANCED".equalsIgnoreCase(level)) {

        intensity = "HIGH";

    } else if ("INTERMEDIATE" .equalsIgnoreCase(level)) {

        intensity = "HIGH";

    } else {

        
        intensity = "MEDIUM";
    }

   // explication --- reason
    List<String> reasons = new ArrayList<>();

    reasons.add( "Groupe musculaire ciblé : " + targetMuscle);

    reasons.add( "Objectif : " + safe(goal)  );

    reasons.add( "Niveau : " + safe(level));

    reasons.add( "Équipement : " + safe(equipment) );

    reasons.add( "Temps disponible : " + availableMinutes + " minutes" );

    if ("HIGH".equalsIgnoreCase(lastIntensity)) {

        reasons.add(
                "La dernière séance était HIGH : " +
                "intensité réduite à MEDIUM pour la récupération"
        );
    }

    
    Map<String, Object> result = new HashMap<>();

    result.put( "athleteId", athlete.getId()
    );

    result.put("athleteName",
            athlete.getFullName()
    );

    result.put(
    "goal",
            goal
    );

    result.put(
    "level",
            level
    );

    result.put(
            "weightKg",athlete.getWeightKg()
    );

    result.put(
            "availableMinutes", availableMinutes
    );

    result.put(
            "focusMuscleGroup", targetMuscle
    );

    result.put(
            "intensity", intensity
    );

    result.put(
            "exercises", scored
    );

    result.put(
            "reasons", reasons
    );

    return result;
}

    private String pickLeast(Map<String, Integer> counts) {   //prendre le min
        if ( counts.isEmpty() ) return "FULL_BODY";

        String best = null;
        
        int v = Integer.MAX_VALUE;
        
        for ( Map.Entry<String, Integer> e : counts.entrySet() ) {

            if ( e.getValue() < v ) {
                v = e.getValue();
                best = e.getKey();
            }
        }
        return best == null ? "FULL_BODY" : best;
    }

    private String pickSessionIntensity(TrainingSession s) {    // choisir intensite de seance 


        if (s.getSessionIntensity() !=null) return s.getSessionIntensity(); 

        
        List<SessionExercise> ses = sessionExerciseRepository.findBySessionId(s.getId());
        if (ses.isEmpty()) return null;
        return ses.get(0).getIntensity();
    }

    private String safe(String s) {
        return s == null ? "UNKNOWN" : s;
    }


    public Map<String, Object> recommendWithFilters(RecommendationRequest request) {
    Athlete athlete = athleteRepository.findById(request.getAthleteId()).orElseThrow();

    String goal = request.getGoal();
    if (goal == null || goal.isBlank()) {
        goal = athlete.getGoal();
    }

    String level = request.getLevel();
    if (level == null || level.isBlank()) {
        level = athlete.getLevel();
    }

    String equipment = request.getEquipment();
    if (equipment == null || equipment.isBlank()) {
        equipment = athlete.getEquipment();
    }

    Integer availableMinutes = request.getAvailableMinutes();
    if (availableMinutes == null) {
        availableMinutes = athlete.getAvailableMinutes();
    }
    if (availableMinutes == null) {
        availableMinutes = 30;
    }

    List<TrainingSession> last = trainingSessionRepository.findTop3ByAthleteIdOrderBySessionDateDesc(athlete.getId());

    Map<String, Integer> counts = new HashMap<>();
    String lastIntensity = null;

    for (int i = 0; i < last.size(); i++) {
        TrainingSession s = last.get(i);

        if (i == 0) {
            lastIntensity = pickSessionIntensity(s);
        }

        List<SessionExercise> ses = sessionExerciseRepository.findBySessionId(s.getId());

        for (SessionExercise se : ses) {
            if (se.getExercise() != null
                    && se.getExercise().getMuscleGroup() != null
                    && se.getExercise().getMuscleGroup().getName() != null) {
                String mg = se.getExercise().getMuscleGroup().getName();
                counts.put(mg, counts.getOrDefault(mg, 0) + 1);
            }
        }
    }

    String target = pickLeast(counts);

    List<Exercise> candidates = exerciseRepository.findByMuscleGroupNameIgnoreCase(target);
    if (candidates.isEmpty()) {
        candidates = exerciseRepository.findAll();
    }

    List<Map<String, Object>> scoredExercises = new ArrayList<>();

    for (Exercise e : candidates) {
        int score = 0;

        if (e.getMuscleGroup() != null
                && e.getMuscleGroup().getName() != null
                && e.getMuscleGroup().getName().equalsIgnoreCase(target)) {
            score = score + 5;
        }

        if (matchesGoal(e, goal)) {
            score = score + 4;
        }

        if (matchesLevel(e, level)) {
            score = score + 3;
        } else {
            score = score - 2;
        }

        if (matchesEquipment(e, equipment)) {
            score = score + 3;
        } else {
            score = score - 2;
        }

        Map<String, Object> row = new HashMap<>();
        row.put("id", e.getId());
        row.put("name", e.getName());
        row.put("muscleGroup", e.getMuscleGroup() != null ? e.getMuscleGroup().getName() : "");
        row.put("difficulty", e.getDifficulty());
        row.put("score", score);

        scoredExercises.add(row);
    }

    scoredExercises.sort((a, b) -> Integer.compare((Integer) b.get("score"), (Integer) a.get("score")));

    int limit = pickExerciseLimit(availableMinutes);
    if (scoredExercises.size() > limit) {
        scoredExercises = new ArrayList<>(scoredExercises.subList(0, limit));
    }

    String intensity = "MEDIUM";

    if (lastIntensity == null) intensity = "MEDIUM";
    else if ("HIGH".equalsIgnoreCase(lastIntensity)) intensity = "MEDIUM";
    else intensity = "HIGH";

    List<String> reasons = new ArrayList<>();
    reasons.add("goal=" + safe(goal));
    reasons.add("targetMuscle=" + target);
    reasons.add("level=" + safe(level));
    reasons.add("equipment=" + safe(equipment));
    reasons.add("intensity=" + intensity);

    Map<String, Object> res = new HashMap<>();
    res.put("athleteId", athlete.getId());
    res.put("athleteName", athlete.getFullName());
    res.put("goal", goal);
    res.put("level", level);
    res.put("weightKg", athlete.getWeightKg());
    res.put("availableMinutes", availableMinutes);
    res.put("focusMuscleGr", target);
    res.put("focusMuscleGroup", target);
    res.put("intensity", intensity);
    res.put("exercises", scoredExercises);
    res.put("reasons", reasons);
    return res;
}
private int pickExerciseLimit(Integer availableMinutes) {
    if (availableMinutes == null) {
        return 3;
    }

    if (availableMinutes <= 20) {
        return 2;
    }

    if (availableMinutes <= 45) {
        return 3;
    }

    return 4;
}

private boolean matchesGoal(
        Exercise exercise, String goal
) {

    if (goal == null || goal.isBlank()) {

        return true;
    }

    String g = goal.toUpperCase();

    String type = exercise.getType() == null
                    ? ""
                    : exercise.getType() .toUpperCase();

    String difficulty =
            exercise.getDifficulty() == null
                    ? ""
                    : exercise.getDifficulty().toUpperCase();

    // prise de muscle
    if (g.equals("MUSCLE_GAIN")) {

        return type.equals("STRENGTH") || difficulty.equals("MEDIUM") || difficulty.equals("HARD");
    }

    // force
    if (g.equals("STRENGTH")) {

        return type.equals("STRENGTH") || difficulty.equals("HARD");
    }

    // perte de poids
    if (g.equals("WEIGHT_LOSS")) {

        return type.equals("CARDIO") || type.equals("HIIT");
    }

    // endurance
    if (g.equals("ENDURANCE")) {

        return type.equals("CARDIO") || type.equals("HIIT");
    }

    return true;
}

private boolean matchesLevel(Exercise exercise, String level) {
    if (level == null || level.isBlank()) {
        return true;
    }

    String l = level.toLowerCase();
    String d = exercise.getDifficulty() == null ? "" : exercise.getDifficulty().toLowerCase();

    if (l.contains("beginner") || l.contains("debutant")) {
        return d.contains("easy") || d.contains("medium") || d.isBlank();
    }

    if (l.contains("intermediate")) {
        return d.contains("medium") || d.contains("easy") || d.isBlank();
    }

    if (l.contains("advanced") || l.contains("avance")) {
        return true;
    }

    return true;
}

private boolean matchesEquipment(
        Exercise exercise,
        String equipment
) {

    if (equipment == null
            || equipment.isBlank()) {

        return true;
    }

    String athleteEquipment =equipment.toUpperCase();

    String exerciseEquipment =
            exercise.getEquipment() == null
                    ? ""
                    : exercise.getEquipment().toUpperCase();

    // GYM all is available
    if (athleteEquipment.equals("GYM")) {
        return true;
    }

    
    if (athleteEquipment.equals(
            "DUMBBELLS"
    )) {

        return exerciseEquipment.equals("DUMBBELLS")|| exerciseEquipment.equals("HOME");
    }

    // Home
    if (athleteEquipment.equals(
            "HOME"
    )) {

        return exerciseEquipment.equals("HOME");
    }

    return exerciseEquipment.equalsIgnoreCase(athleteEquipment);
}
}
