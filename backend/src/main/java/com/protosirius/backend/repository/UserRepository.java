package com.protosirius.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.protosirius.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    User findByEmail(String email);

}
