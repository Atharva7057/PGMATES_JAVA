package com.pgmates.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pgmates.dto.LoginRequest;
import com.pgmates.dto.PropertyDetailsDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.ReviewInfo;
import com.pgmates.dto.UserDto;
import com.pgmates.service.UserServices;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
	UserServices user_service;
	
	@PostMapping("/register-user")
	public ResponseEntity<?> registerUser(@RequestBody UserDto new_user){
		return ResponseEntity.status(HttpStatus.OK).body(user_service.registerUser(new_user));
	}
	

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest credentials) {
	    UserDto user = user_service.userLogin(credentials.getEmail(),credentials.getPassword() );
	    return ResponseEntity.ok(user);
	   
	}
	@GetMapping("/getAllProperties")
	 public List<PropertyDto> getAllProperties() {
        return user_service.getAllProperties();
    }
	
	@GetMapping("/properties/{propertyId}")
    public PropertyDetailsDto getPropertyDetails(@PathVariable String propertyId) {
		int id = Integer.parseInt(propertyId);
        return user_service.getPropertyWithAllDetails(id);
    }
	
	@PostMapping("/addreview")
	public ResponseEntity<?> addReview(@RequestBody ReviewInfo reviewdata) {
		return ResponseEntity.status(HttpStatus.CREATED).body(user_service.addReview(reviewdata));
	}
	

}
