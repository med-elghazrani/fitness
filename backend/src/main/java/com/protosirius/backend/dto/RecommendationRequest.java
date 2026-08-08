package com.protosirius.backend.dto;

public class RecommendationRequest {

    private Long athleteId;
    private String goal;
    private Integer availableMinutes;
    private String level;
    private String equipment;

    public RecommendationRequest() {
    }

    public Long getAthleteId() {
        return athleteId;
    }

    public void setAthleteId(Long athleteId) {
        this.athleteId = athleteId;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public Integer getAvailableMinutes() {
        return availableMinutes;
    }

    public void setAvailableMinutes(Integer availableMinutes) {
        this.availableMinutes = availableMinutes;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }
}