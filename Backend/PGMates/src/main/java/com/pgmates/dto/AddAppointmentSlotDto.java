package com.pgmates.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddAppointmentSlotDto {
	private int property;
	private int owner;
    private String date;
    private String time;
    private String endTime;
    private boolean isBooked;
    
	public AddAppointmentSlotDto(int property,  int owner, String date, String time, String endTime,
			boolean isBooked) {
		super();
		this.property = property;
		this.owner = owner;
		this.date = date;
		this.time = time;
		this.endTime = endTime;
		this.isBooked = isBooked;
	}
    
    
}
