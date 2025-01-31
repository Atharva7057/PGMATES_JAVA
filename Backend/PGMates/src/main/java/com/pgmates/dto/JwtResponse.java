package com.pgmates.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
	 private String token;
	    private UserDto user;

	    public JwtResponse(String token, UserDto user) {
	        this.token = token;
	        this.user = user;
	    }

}
