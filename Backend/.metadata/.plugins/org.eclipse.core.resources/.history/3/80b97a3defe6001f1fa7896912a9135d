package com.pgmates.service;

import java.util.List;

import com.pgmates.dto.AddAppointmentSlotDto;
import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.AppointmentsDto;
import com.pgmates.dto.AvailabilityResponse;
import com.pgmates.dto.BookedAppointmentsDto;
import com.pgmates.dto.PropertyDetailsDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.PropertyRequest;

public interface OwnerServicesIF {
	public ApiResponse addAppointmentSlot(AddAppointmentSlotDto appointmentSlotDto);

	public ApiResponse deleteAppointmentSlot(int appointmentId);

	public ApiResponse updateAppointmentSlot(int appointmentId, AddAppointmentSlotDto appointmentSlotDto);

	public ApiResponse cancelAppointment(int appointmentId);

	public ApiResponse registerProperty(int owner_id, PropertyRequest propertyRequestDTO);

	public List<PropertyDto> getPropertiesByOwner(int owner_id);

	ApiResponse updateProperty(int owner_id, int propertyId, PropertyRequest propertyRequest);

	ApiResponse deleteProperty(int owner_id, int propertyId);
	
	public PropertyDetailsDto getPropertyDetails(int propertyId);
	
	public List<BookedAppointmentsDto> getBookedAppointmentsByOwnerId(int ownerId);
	
	public AvailabilityResponse togglePropertyAvailability(int propertyId);
	


}
