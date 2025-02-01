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
