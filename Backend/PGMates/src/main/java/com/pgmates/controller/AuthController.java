package com.pgmates.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgmates.config.JwtUtil;
import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.UserDto;
import com.pgmates.service.AuthService;

@RestController
@RequestMapping("/api/authenticate")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

	@Autowired
	private AuthService authService;

	@Autowired
	private JwtUtil jwtutil;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserDto userDTO) {
		ApiResponse registeredUser = authService.registerUser(userDTO);
		if (!registeredUser.getMessage().equals("User Registered Successfully!")) {
			return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(registeredUser);
		}

		return ResponseEntity.ok(registeredUser);
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserDto userDTO) {
		return ResponseEntity.ok(authService.loginUser(userDTO));
	}

}
