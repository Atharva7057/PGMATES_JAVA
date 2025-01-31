package com.pgmates.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.User;

public interface AuthDao extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}