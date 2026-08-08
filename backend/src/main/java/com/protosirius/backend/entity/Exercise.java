package com.protosirius.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "met_base", nullable = false)
    private Double metBase;

    @ManyToOne
    @JoinColumn(name = "muscle_group_id", nullable = false)
    private MuscleGroup muscleGroup;

    @Column(name = "type")
    private String type;

    @Column(name = "equipment")
    private String equipment;

    @Column(name = "difficulty")
    private String difficulty;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getMetBase() { return metBase; }
    public void setMetBase(Double metBase) { this.metBase = metBase; }

    public MuscleGroup getMuscleGroup() { return muscleGroup; }
    public void setMuscleGroup(MuscleGroup muscleGroup) { this.muscleGroup = muscleGroup; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getEquipment() { return equipment; }
    public void setEquipment(String equipment) { this.equipment = equipment; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
