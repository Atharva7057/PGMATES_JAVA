package com.pgmates.service;

import com.pgmates.config.JwtUtil;
import com.pgmates.dao.AuthDao;
import com.pgmates.dto.AuthResponse;
import com.pgmates.dto.UserDto;
import com.pgmates.entity.User;
import com.pgmates.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthDao authDao; // Use AuthDao instead of UserRepository

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public UserDto registerUser(UserDto userDTO) {
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(userDTO.getRole());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setGender(userDTO.getGender());
        user.setContact(userDTO.getContact());
        authDao.save(user); // Use AuthDao to save the user
        return userDTO;
    }
    
    public AuthResponse loginUser(UserDto userDTO) {
    	try {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
        );
        
        // Set security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token
        String token = jwtUtil.generateToken((UserDetails) authentication.getPrincipal());

        // Fetch user from database
        User user = authDao.findByEmail(userDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convert User entity to UserDto
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setGender(user.getGender());
        userDto.setContact(user.getContact());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());

        // Return token + user details
        return new AuthResponse(token, userDto);
    	}catch(BadCredentialsException e) {
    		throw new ResourceNotFoundException("Invalid username or Password");
    	}
    	
    }


}