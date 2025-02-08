package com.pgmates.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgmates.entity.Address;

public interface AddressDao extends JpaRepository<Address, Integer> {

}
