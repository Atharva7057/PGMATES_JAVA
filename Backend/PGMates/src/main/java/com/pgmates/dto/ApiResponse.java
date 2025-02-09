package com.pgmates.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {
	private String message;
	private int count;
	private List<T> data;

	public ApiResponse(String message) {
		this.message = message;
	}

	public ApiResponse(String message, int count, List<T> data) {
	    this.message = message;
	    this.count = count;
	    this.data = data;
	}

	
}
