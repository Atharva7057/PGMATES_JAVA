package com.pgmates.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.User;
import com.pgmates.enums.Role;

public interface UserDao extends JpaRepository<User, Integer> {
	boolean existsByEmail(String email);
	Optional <User>  findByEmailAndPassword(String email,String password);
	
	List<User> findByRole(Role role);
	int countByRole(Role role);

}
