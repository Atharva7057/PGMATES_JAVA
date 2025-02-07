package com.pgmates.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pgmates.dto.PropertyDetailsDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.ReviewInfo;
import com.pgmates.dto.UsersBookedAppointmentDto;
import com.pgmates.service.UserServices;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class UserController {
	
    @Autowired
    UserServices user_service;

    @GetMapping("/getAllProperties")
    //@PreAuthorize("hasRole('USER')")  // ✅ Restricting access to USER role
    public List<PropertyDto> getAllProperties() {
        return user_service.getAllProperties();
    }

    @GetMapping("/properties/{propertyId}")
    //@PreAuthorize("hasRole('USER')")  // ✅ Restricting access to USER role
    public PropertyDetailsDto getPropertyDetails(@PathVariable String propertyId) {
        int id = Integer.parseInt(propertyId);
        return user_service.getPropertyWithAllDetails(id);
    }

	@PostMapping("/addreview")
	public ResponseEntity<?> addReview(@RequestBody ReviewInfo reviewdata) {
		return ResponseEntity.status(HttpStatus.CREATED).body(user_service.addReview(reviewdata));
	}
	
	@PostMapping("/bookAppointment/{userId}/{appointmentId}")
	public ResponseEntity<?> bookAppointment(@PathVariable int userId, @PathVariable int appointmentId){
		return ResponseEntity.status(HttpStatus.OK).body(user_service.bookAppointment(userId, appointmentId));
	}
	
	@PostMapping("/cancelAppointment/{appointmentId}")
	public ResponseEntity<?> cancelAppointment(@PathVariable int appointmentId){
		return ResponseEntity.status(HttpStatus.OK).body(user_service.cancelUserAppointment(appointmentId));
	}
	

	@GetMapping("/bookedAppointmentsByUserId/{userId}")
	public  ResponseEntity<?> bookedAppointmentByUser(@PathVariable int userId) {
		List<UsersBookedAppointmentDto> list = user_service.getBookedAppointmentsByUserId(userId);
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	@RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions(HttpServletRequest request, HttpServletResponse response) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "http://localhost:5173");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        headers.add("Access-Control-Allow-Headers", "Authorization, Content-Type");
        headers.add("Access-Control-Allow-Credentials", "true");

        return new ResponseEntity<>(headers, HttpStatus.OK);
    }
	
}
