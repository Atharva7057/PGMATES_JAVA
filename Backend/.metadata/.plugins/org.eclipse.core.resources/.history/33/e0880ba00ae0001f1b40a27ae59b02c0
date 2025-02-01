package com.pgmates.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pgmates.dao.AuthDao;
import com.pgmates.dto.UserDto;
import com.pgmates.entity.User;
import com.pgmates.enums.Gender;
import com.pgmates.enums.Role;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthDao authDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public  UserDto registerUser( UserDto userDTO) {
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setGender(Gender.valueOf(userDTO.getGender()));
        user.setContact(userDTO.getContact());
        user.setEmail(userDTO.getEmail());
        user.setRole(Role.valueOf(userDTO.getRole()));
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        authDao.save(user);
        userDTO.setUserId(user.getUserId());
        return userDTO;
    }

    @Override
    public  UserDto authenticateUser(String email, String password) {
        User user = authDao.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return new  UserDto(user.getUserId(), user.getFirstName(), user.getLastName(), 
                               user.getGender().name(), user.getContact(), 
                               user.getEmail(), user.getRole().name(), user.getPassword());
        }
        return null;
    }
}

