package com.pgmates.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AppointmentsDto {
    private int apptId;
    private String date;
    private String time;
    private String endTime;
    private boolean isBooked;

    // Constructor
    public AppointmentsDto(int apptId, PropertyDto property, UserDto user, UserDto owner, String date, String time, String endTime, boolean isBooked) {
        this.apptId = apptId;
        this.date = date;
        this.time = time;
        this.endTime = endTime;
        this.isBooked = isBooked;
    }
}
