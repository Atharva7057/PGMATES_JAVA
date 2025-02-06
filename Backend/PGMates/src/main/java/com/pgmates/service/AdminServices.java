package com.pgmates.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.pgmates.dao.PropertyDao;
import com.pgmates.dao.UserDao;
import com.pgmates.dto.ApiResponse;
import com.pgmates.dto.PropertyAdminDto;
import com.pgmates.dto.UserAdminDto;
import com.pgmates.entity.Property;
import com.pgmates.enums.Role;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServices implements AdminServicesIF {

    @Autowired
    PropertyDao propertyDao;
    
    @Autowired
    UserDao userDao;
    
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<PropertyAdminDto> getAllProperties() {
        List<Property> properties = propertyDao.findAll();
        
        // Convert the properties to DTOs and return
        return properties.stream()
                         .map(property -> modelMapper.map(property, PropertyAdminDto.class))
                         .collect(Collectors.toList());
    }
    
    // Method to delete a property
    @Override
    public ApiResponse deleteProperty(int propertyId) {
        // Check if the property exists
        boolean doesExist = propertyDao.existsById(propertyId);
        if (!doesExist) {
            return new ApiResponse("Property not found");
        }

        // If it exists, delete it
        propertyDao.deleteById(propertyId);
        return new ApiResponse("Property deleted successfully!");
    }
    
    @Override
    public List<UserAdminDto> getAllUsers() {
        List<com.pgmates.entity.User> users = userDao.findAll();

        // Filter out users who are 'USER' role
        List<com.pgmates.entity.User> filteredUsers = users.stream()
                .filter(user -> user.getRole() == Role.ROLE_USER)  // Keep only users with role 'USER'
                .collect(Collectors.toList());

        // Convert the filtered users to UserDto and return
        return filteredUsers.stream()
                .map(user -> modelMapper.map(user, UserAdminDto.class))
                .collect(Collectors.toList());
    }
    // Method to get the count of all users
    @Override
    public int getUserCount() {
        return (int) userDao.count();
    }
    
    @Override
 // Method to delete a user by ID
    public ApiResponse deleteUser(int userId) {
        Optional<com.pgmates.entity.User> userOptional = userDao.findById(userId);

        if (userOptional.isPresent()) {
            userDao.deleteById(userId);
            return new ApiResponse("User deleted successfully!");
        } else {
            return new ApiResponse("User not found");
        }
    }
    
    
    @Override
 // Method to get all owners
    public List<UserAdminDto> getAllOwners() {
        // Fetch all users who have the role of OWNER
        return userDao.findAll().stream()
                      .filter(user -> user.getRole() == Role.ROLE_OWNER)  // Filter users with the OWNER role
                      .map(user -> {
                          // Map the User entity to UserDto
                          UserAdminDto userDto = modelMapper.map(user, UserAdminDto.class);
                          return userDto;
                      })
                      .collect(Collectors.toList());
    }
    
    @Override
    // Method to get count of owners
    public int getOwnerCount() {
        return (int) userDao.countByRole(Role.ROLE_OWNER);  // Get the count of users with the role OWNER
    }
    
    // Method to delete an owner
    @Override
    public ApiResponse deleteOwner(int userId) {
        Optional<com.pgmates.entity.User> userOptional = userDao.findById(userId);

        if (userOptional.isPresent()) {
            com.pgmates.entity.User user = userOptional.get();
            if (user.getRole() == Role.ROLE_OWNER) {  // Check if the user is an OWNER
                userDao.deleteById(userId);
                return new ApiResponse("Owner deleted successfully!");
            } else {
                return new ApiResponse("The user is not an owner.");
            }
        } else {
            return new ApiResponse("Owner not found");
        }
    }
   
}
