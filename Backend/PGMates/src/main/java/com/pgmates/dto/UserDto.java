package com.pgmates.dto;



import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.pgmates.entity.Appointments;
import com.pgmates.enums.Gender;
import com.pgmates.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	    private int userId;
	    private String firstName;   
	    private String lastName;   
	    private Gender gender;    
	    private String contact;
	    private String email;   
	    private String password;
	    private Role  role;
}
