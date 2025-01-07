package com.pgmates.service;

import java.util.List;

import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.PropertyDetailsDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.ReviewInfo;
import com.pgmates.dto.UserDto;

public interface UserServicesIF {
	public ApiResponse registerUser(UserDto new_user);
	public UserDto userLogin(String email,String password);
	public List<PropertyDto> getAllProperties();
	public PropertyDetailsDto getPropertyWithAllDetails(int pid);
	public ApiResponse addReview(ReviewInfo reviewdata);
}
