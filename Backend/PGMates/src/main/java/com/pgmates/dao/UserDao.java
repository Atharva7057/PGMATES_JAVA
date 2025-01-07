package com.pgmates.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.User;

public interface UserDao extends JpaRepository<User, Integer> {
	boolean existsByEmail(String email);
	Optional <User>  findByEmailAndPassword(String email,String password);

}
