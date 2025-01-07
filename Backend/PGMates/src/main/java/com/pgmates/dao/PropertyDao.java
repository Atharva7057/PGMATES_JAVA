package com.pgmates.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.Property;

public interface PropertyDao extends JpaRepository<Property, Integer> {
	

}
