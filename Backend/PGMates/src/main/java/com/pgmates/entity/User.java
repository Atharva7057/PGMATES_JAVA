package com.pgmates.entity;
import java.util.List;

import com.pgmates.enums.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

	@Entity
	@Getter
	@Setter
	@NoArgsConstructor
	public class User {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int userId;
	    @Column(nullable = false)
	    private String firstName;
	    @Column(nullable = false)
	    private String lastName;
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Gender gender;
	    @Column(nullable = false)
	    private String contact;
	    @Column(nullable = false)
	    private String email;
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private Role role;
	    @Column(nullable = false)
	    private String password;
	    @OneToMany(mappedBy = "user")
	    private List<Appointments> appointments; // User's booked appointments
	    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	    private List<Property> properties;
	    
		public User(int userId, String firstName,String lastName,Role role , Gender gender, String contact, String email, String password) {
			super();
			this.userId = userId;
			this.firstName = firstName;
			this.lastName = lastName;
			this.gender = gender;
			this.contact = contact;
			this.role = role;
			this.email = email;
			this.password = password;
		}

	    // Getters and Setters
	    
	}


