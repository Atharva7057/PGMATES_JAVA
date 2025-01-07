package com.pgmates.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Admin {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    	private int adminId;
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
	    
		public Admin(int adminId, String fullName, String gender, String contact, String email, String password) {
			super();
			this.adminId = adminId;
			this.fullName = fullName;
			this.gender = gender;
			this.contact = contact;
			this.email = email;
			this.password = password;
		}
	    
	    
}
