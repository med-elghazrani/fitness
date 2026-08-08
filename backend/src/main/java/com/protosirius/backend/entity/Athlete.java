package com.protosirius.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "athlete")
public class Athlete {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "weight_kg", nullable = false)
    private Double weightKg;

    @Column(name = "goal")
    private String goal;

    @Column(name = "level")
    private String level;

    @Column(name = "height_cm")
    private Double heightCm;

    @Column(name = "age")
    private Integer age;

    @Column(name = "available_minutes")
    private Integer availableMinutes;

    @Column(name = "equipment")
    private String equipment;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public Double getHeightCm() { return heightCm; }
    public void setHeightCm(Double heightCm) { this.heightCm = heightCm; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Integer getAvailableMinutes() { return availableMinutes; }
    public void setAvailableMinutes(Integer availableMinutes) { this.availableMinutes = availableMinutes; }

    public String getEquipment() { return equipment; }
    public void setEquipment(String equipment) { this.equipment = equipment; }

    @Transient
    public String getFullName() {
        String f = firstName == null ? "" : firstName;
        String l = lastName == null ? "" : lastName;
        return (f + " " + l).trim();
    }
}
