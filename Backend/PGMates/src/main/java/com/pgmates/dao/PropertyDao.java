package com.pgmates.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.Property;

public interface PropertyDao extends JpaRepository<Property, Integer> {
//to find list of properties based on owner id
	List<Property> findByOwner_UserId(int owner_id);

}
