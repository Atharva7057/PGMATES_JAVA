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

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownerId;
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

    @OneToMany(mappedBy = "owner")
    private List<Property> properties;
    
    @OneToMany(mappedBy = "owner")
    private List<Appointments> appointments; // Appointments for the owner's properties

	public Owner(int ownerId, String fullName, String gender, String contact, String email, String password,
			List<Property> properties, List<Appointments> appointments) {
		super();
		this.ownerId = ownerId;
		this.fullName = fullName;
		this.gender = gender;
		this.contact = contact;
		this.email = email;
		this.password = password;
		this.properties = properties;
		this.appointments = appointments;
	}
    
}

