package com.pgmates.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.Reviews;
import com.pgmates.entity.User;

public interface ReviewDao extends JpaRepository<Reviews, Integer> {
	

}
