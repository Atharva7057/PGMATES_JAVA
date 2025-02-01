package com.pgmates.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgmates.dao.AppointmentsDao;
import com.pgmates.dao.PropertyDao;
import com.pgmates.dao.UserDao;
import com.pgmates.dto.AddAppointmentSlotDto;
import com.pgmates.dto.ApiResponse;
import com.pgmates.entity.Appointments;
import com.pgmates.entity.Property;
import com.pgmates.entity.User;
import com.pgmates.exceptions.ResourceNotFoundException;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OwnerServices implements OwnerServicesIF {
	@Autowired
	AppointmentsDao appointmentDao;
	
	@Autowired
	ModelMapper mapper;
	
	@Autowired
	PropertyDao propertyDao;
	
	@Autowired
	UserDao userdao;
	
	@Override
	public ApiResponse addAppointmentSlot(AddAppointmentSlotDto appointmentSlotDto) {
		
		
		int ownerId = appointmentSlotDto.getOwner();
		int PropertyId = appointmentSlotDto.getProperty();
		
		Appointments appointment = mapper.map(appointmentSlotDto, Appointments.class);
		
		Optional<Property> propertyopt =  propertyDao.findById(PropertyId);
		Optional<User> owneropt = userdao.findById(ownerId);
		
		
		appointment.setProperty(propertyopt.get());
		appointment.setOwner(owneropt.get());
		
		boolean isAdded =  appointmentDao.save(appointment) != null;
		
		if(isAdded) {
			return new ApiResponse("Slot Added Successfully!");
		}
		return new ApiResponse("Try Again!");
		
	}

	@Override
	public ApiResponse deleteAppointmentSlot(int appointmentId) {
		boolean doesExist = appointmentDao.existsById(appointmentId);
		if(!doesExist) {
			return new ApiResponse("Slot doesn't Exist");
		}
		appointmentDao.deleteById(appointmentId);
		return new ApiResponse("Slot deleted successfully!");
	}

	@Override
	public ApiResponse updateAppointmentSlot(int appointmentId, AddAppointmentSlotDto appointmentSlotDto) {
		// TODO Auto-generated method stub
		 Optional<Appointments> appointmentOpt = appointmentDao.findById(appointmentId);
	        
	        if (!appointmentOpt.isPresent()) {
	            return new ApiResponse("Appointment not found!");
	        }
	        
	        Appointments appointment = appointmentOpt.get();
	        
	        int ownerId = appointmentSlotDto.getOwner();
	        int propertyId = appointmentSlotDto.getProperty();
	        
	        Optional<Property> propertyOpt = propertyDao.findById(propertyId);
	        Optional<User> ownerOpt = userdao.findById(ownerId);
	        
	        if (!propertyOpt.isPresent() || !ownerOpt.isPresent()) {
	            return new ApiResponse("Invalid Property or Owner!");
	        }
	        
	        appointment.setProperty(propertyOpt.get());
	        appointment.setOwner(ownerOpt.get());
	        appointment.setDate(appointmentSlotDto.getDate());
	        appointment.setTime(appointmentSlotDto.getTime());
	        appointment.setEndTime(appointmentSlotDto.getEndTime());
	        appointment.setBooked(appointmentSlotDto.isBooked());
	        
	        appointmentDao.save(appointment);
	        
	        return new ApiResponse("Appointment Slot Updated Successfully!");
		
	}
	 public ApiResponse cancelAppointment(int appointmentId) {
		 Appointments appointment = appointmentDao.findById(appointmentId)
	                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found!"));
	        
	        if (!appointment.isBooked()) {
	            return new ApiResponse("Appointment is already not booked!");
	        }
	        
	        appointment.setBooked(false);
	        appointment.setUser(null);
	        appointmentDao.save(appointment);
	        
	        return new ApiResponse("Appointment Cancelled Successfully!");
	    }
	

}
