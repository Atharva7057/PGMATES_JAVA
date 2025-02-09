package com.pgmates.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.PropertyAdminDto;
import com.pgmates.dto.UserAdminDto;
import com.pgmates.service.AdminServices;

import java.util.List;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    AdminServices adminServices;

    @GetMapping("/getAllProperties")
    public ResponseEntity<?> getAllProperties() {
        List<PropertyAdminDto> properties = adminServices.getAllProperties();
        
        if (properties.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<PropertyAdminDto>("No properties found", 0, null));
        }
        
        int propertyCount = properties.size();
        
        ApiResponse<PropertyAdminDto> response = new ApiResponse<>("Properties retrieved successfully", propertyCount, properties);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/deleteProperty/{propertyId}")
    public ResponseEntity<?> deleteProperty(@PathVariable int propertyId) {
        ApiResponse response = adminServices.deleteProperty(propertyId);
        
        if ("Property deleted successfully!".equals(response.getMessage())) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        List<UserAdminDto> users = adminServices.getAllUsers();
        int userCount = users.size();

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<UserAdminDto>("No users found", 0, null));
        }

        ApiResponse<UserAdminDto> response = new ApiResponse<>("Users retrieved successfully", userCount, users);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) {
        ApiResponse response = adminServices.deleteUser(userId);

        if ("User deleted successfully!".equals(response.getMessage())) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/getAllOwners")
    public ResponseEntity<?> getAllOwners() {
        List<UserAdminDto> owners = adminServices.getAllOwners();
        int ownerCount = adminServices.getOwnerCount();

        if (owners.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<UserAdminDto>("No owners found", 0, null));
        }

        ApiResponse<UserAdminDto> response = new ApiResponse<>("Owners retrieved successfully", ownerCount, owners);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/deleteOwner/{userId}")
    public ResponseEntity<?> deleteOwner(@PathVariable int userId) {
        ApiResponse response = adminServices.deleteOwner(userId);

        if ("Owner deleted successfully!".equals(response.getMessage())) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    
    @GetMapping("/getPropertyById/{propertyId}")
    public ResponseEntity<?> getPropertyById(@PathVariable int propertyId){
    	return ResponseEntity.status(HttpStatus.OK).body(adminServices.getPropertyWithAllDetails(propertyId));
    }
}
