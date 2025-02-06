package com.pgmates.controller;


import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgmates.config.JwtUtil;
import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.UserDto;
import com.pgmates.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authenticate")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDTO) {
        UserDto registeredUser = authService.registerUser(userDTO);
        return ResponseEntity.ok(registeredUser);
    }

	    @Autowired
	    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDTO) {
        return ResponseEntity.ok(authService.loginUser(userDTO));
    }
    
}
