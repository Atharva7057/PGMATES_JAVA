package com.pgmates.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class AdminController {

    @Autowired
    AdminServices adminServices;

    // Endpoint to get all listed properties
    @GetMapping("/getAllProperties")
    public ResponseEntity<?> getAllProperties() {
        List<PropertyAdminDto> properties = adminServices.getAllProperties();
        
        if (properties.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No properties found"));
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(properties);
    }
    
 // Endpoint to delete a property
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
        List<UserAdminDto> users = adminServices.getAllUsers();  // Get only 'USER' role users
        int userCount = users.size();                       // Count the number of users

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No users found"));
        }

        // Ensure the response includes only 'USER' role users and their count
        ApiResponse response = new ApiResponse("Users retrieved successfully", userCount, users);
        
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
        
     // Endpoint to delete a user by ID
        @DeleteMapping("/deleteUser/{userId}")
        public ResponseEntity<?> deleteUser(@PathVariable int userId) {
            ApiResponse response = adminServices.deleteUser(userId);
            
            if ("User deleted successfully!".equals(response.getMessage())) {
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
           }
        
    }
        
        // Endpoint to get all owners and their count
        @GetMapping("/getAllOwners")
        public ResponseEntity<?> getAllOwners() {
            List<UserAdminDto> owners = adminServices.getAllOwners();  // Get all owners
            int ownerCount = adminServices.getOwnerCount();        // Get owner count
            
            if (owners.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No owners found"));
            }

            ApiResponse response = new ApiResponse("Owners retrieved successfully", ownerCount, owners);
            
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        
     // Endpoint to delete an owner
        @DeleteMapping("/deleteOwner/{userId}")
        public ResponseEntity<?> deleteOwner(@PathVariable int userId) {
            ApiResponse response = adminServices.deleteOwner(userId);
            
            if ("Owner deleted successfully!".equals(response.getMessage())) {
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }

}

    