package com.protosirius.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.protosirius.backend.entity.Measure;
import com.protosirius.backend.repository.MeasureRepository;

@Service
public class StatsService {
    private final MeasureRepository measureRepository;
    public StatsService(MeasureRepository measureRepository) {
        this.measureRepository = measureRepository;
    }

    public Page<Measure> getUserStats(Integer userId, Pageable pageable) {
        return measureRepository.findByUserIdOrderByDateDesc(userId, pageable);
    }

}
