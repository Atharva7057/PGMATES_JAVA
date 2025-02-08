package com.pgmates.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pgmates.dto.BookedAppointmentsDto;
import com.pgmates.entity.Appointments;

public interface AppointmentsDao extends JpaRepository<Appointments,Integer>{
	@Query("SELECT a FROM Appointments a WHERE a.user.id = :userId")
	List<Appointments> getAppointmentsByUserId(@Param("userId") int userId); 
	
	@Query("SELECT a FROM Appointments a WHERE a.owner.id = :ownerId  AND a.isBooked = true")
	List<Appointments> getBookedAppointments(@Param("ownerId") int ownerId);

}
