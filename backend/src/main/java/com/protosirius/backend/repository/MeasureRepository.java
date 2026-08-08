package com.protosirius.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.protosirius.backend.entity.Measure;

public interface MeasureRepository extends JpaRepository<Measure, Long> {
    Page<Measure> findByUserIdOrderByDateDesc(Integer userId, Pageable pageable);
    Page<Measure> findAllByOrderByDateDesc(Pageable pageable);
}
