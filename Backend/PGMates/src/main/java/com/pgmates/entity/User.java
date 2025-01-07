package com.pgmates.entity;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
	    private String fullName;
	    @Column(nullable = false)
	    private String gender;
	    @Column(nullable = false)
	    private String contact;
	    @Column(nullable = false)
	    private String email;
	    @Column(nullable = false)
	    private String password;
	    @OneToMany(mappedBy = "user")
	    private List<Appointments> appointments; // User's booked appointments
	    
		public User(int userId, String fullName, String gender, String contact, String email, String password) {
			super();
			this.userId = userId;
			this.fullName = fullName;
			this.gender = gender;
			this.contact = contact;
			this.email = email;
			this.password = password;
		}

	    // Getters and Setters
	    
	}


