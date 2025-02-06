package com.pgmates.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
	private String message;
	private int count;
	private List<UserAdminDto> data;

	public ApiResponse(String message) {
		this.message = message;
	}

//	public ApiResponse(String message, int count, List<UserDto> data) {
//	    this.message = message;
//	    this.count = count;
//	    this.data = data;
//	}

	public ApiResponse(String message, int count, List<UserAdminDto> data) {
	    this.message = message;
	    this.count = count;
	    this.data = data;
	}

	
}
