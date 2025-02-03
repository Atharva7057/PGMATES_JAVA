package com.pgmates.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsersBookedAppointmentDto {
    private int apptId;
    private String date;
    private String time;
    private String endTime;
    private int propertyId;
    private boolean isBooked;

    // Constructor
    public UsersBookedAppointmentDto(int apptId, PropertyDto property, UserDto user, 
    		UserDto owner, String date, String time, String endTime, boolean isBooked,int propertyId) {
        this.apptId = apptId;
        this.date = date;
        this.time = time;
        this.endTime = endTime;
        this.isBooked = isBooked;
        this.propertyId = propertyId;
    }
}


