package com.pgmates.service;

import com.pgmates.dto.UserDto;

public interface AuthService {
	  UserDto registerUser( UserDto userDTO);
	  UserDto authenticateUser(String email, String password);

}
