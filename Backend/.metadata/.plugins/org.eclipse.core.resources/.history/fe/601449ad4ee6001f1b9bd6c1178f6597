package com.pgmates.entity;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@Setter

public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int propertyId;
    
    @Column(nullable = false,length = 500)
    private String location;
    
    @OneToOne
    @JoinColumn(name = "address")
    private Address address;
    
    @Column(nullable = false)
    private double rent;
    
    @Column(nullable = false)
    private double deposit;
    
    private String type;
    
    @ManyToOne
    @JoinColumn(name = "owner_id",referencedColumnName = "userId")
    private User owner;
    
    private String image;
    
    @Column(nullable = false)
    private int capacity;
    
    @Column(nullable = false,length = 500)
    private String amenities;
    
    @Column(nullable = false,length = 500)
    private String nearByPlaces;
    
    @Column(nullable = false)
    private String forGender;
    
    @Column(nullable = false)
    private String furnishType;
    
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Appointments> Appointments;
    
    @OneToMany( cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "property_id")
    private List<Reviews> reviews;
    
    
    private boolean isavailable;
    
	public Property(int propertyId, String location, double rent, double deposit, User owner, String image,
			int capacity, String amenities, String nearByPlaces, String forGender, String furnishType,
			List<Appointments> appointments,List<Reviews> reviews) {
		super();
		this.propertyId = propertyId;
		this.location = location;
		this.rent = rent;
		this.deposit = deposit;
		this.owner = owner;
		this.image = image;
		this.capacity = capacity;
		this.amenities = amenities;
		this.nearByPlaces = nearByPlaces;
		this.forGender = forGender;
		this.furnishType = furnishType;
		Appointments = appointments;
		this.reviews =  reviews;
	}
    
}
