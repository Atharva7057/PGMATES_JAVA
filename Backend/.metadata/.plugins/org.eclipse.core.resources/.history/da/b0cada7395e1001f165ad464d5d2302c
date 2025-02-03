package com.pgmates.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.pgmates.dto.PropertyDetailsDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.ReviewInfo;
import com.pgmates.service.UserServices;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
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
<<<<<<< HEAD
=======
	
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
	
>>>>>>> ef2543fb82e42c4b2ef71d088403bfe1f8939bbb

    @PostMapping("/addreview")
    //@PreAuthorize("hasRole('USER')")  //  Restricting access to USER role
    public ResponseEntity<?> addReview(@RequestBody ReviewInfo reviewdata) {
        return ResponseEntity.ok(user_service.addReview(reviewdata));
    }

    @GetMapping("/demo")
    public void demolist() {
        List<String> demoList = List.of("parthavi", "ayushi", "donald duck");
        demoList.forEach(System.out::println);
    }
}
