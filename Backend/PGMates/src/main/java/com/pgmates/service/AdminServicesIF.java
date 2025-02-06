package com.pgmates.service;

import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.PropertyAdminDto;
import com.pgmates.dto.PropertyDto;
import com.pgmates.dto.UserAdminDto;

import java.util.List;

public interface AdminServicesIF {

    // Method to retrieve all listed properties
    List<PropertyAdminDto> getAllProperties();
    
    // Method to delete a property
    ApiResponse deleteProperty(int propertyId);

    
   // Method to retrieve all users
    List<UserAdminDto> getAllUsers();

    // Method to get user count
    int getUserCount();
    
    // Method to delete a user by ID
    ApiResponse deleteUser(int userId);
    
    // Method to get all owners
    List<UserAdminDto> getAllOwners();
    
    // Method to get the count of all owners
    int getOwnerCount();
    
    // Method to delete an owner by userId
    ApiResponse deleteOwner(int userId);  // New method added for owner deletion
}
