package com.pgmates.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.User;

public interface AuthDao extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}