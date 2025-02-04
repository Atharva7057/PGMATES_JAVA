package com.pgmates.service;

import com.pgmates.dto.AddAppointmentSlotDto;
import com.pgmates.dto.ApiResponse;

public interface OwnerServicesIF {
	public ApiResponse addAppointmentSlot(AddAppointmentSlotDto appointmentSlotDto);
	public ApiResponse deleteAppointmentSlot(int appointmentId);
	public ApiResponse updateAppointmentSlot(int appointmentId, AddAppointmentSlotDto appointmentSlotDto);
	public ApiResponse cancelAppointment(int appointmentId);
}
