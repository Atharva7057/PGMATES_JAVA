package com.pgmates.service;

import java.util.List;

import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.PropertyDetailsDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.ReviewInfo;
import com.pgmates.dto.UserDto;
import com.pgmates.dto.UsersBookedAppointmentDto;

public interface UserServicesIF {
	
	public List<PropertyDto> getAllProperties();
	public PropertyDetailsDto getPropertyWithAllDetails(int pid);
	public ApiResponse addReview(ReviewInfo reviewdata);
	public ApiResponse bookAppointment( int userId,  int appointmentId);
	public ApiResponse cancelUserAppointment(int appointmentId);
	public List<UsersBookedAppointmentDto> getBookedAppointmentsByUserId(int userId);
	
}
