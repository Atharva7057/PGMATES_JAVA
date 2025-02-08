package com.pgmates.dto;

public class AvailabilityResponse {
	public String message;
	public boolean availability;
	
	public AvailabilityResponse(String message,boolean availability) {
		this.message = message;
		this.availability = availability;
	}
}
