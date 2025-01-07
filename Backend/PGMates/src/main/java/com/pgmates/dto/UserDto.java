package com.pgmates.dto;

import java.util.List;

import com.pgmates.entity.Appointments;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
	    private int userId;
	    private String fullName;   
	    private String gender;    
	    private String contact;
	    private String email;   
	    private String password;
	   
	   
//	    private List<Appointments> appointments; // User's booked appointments
}
