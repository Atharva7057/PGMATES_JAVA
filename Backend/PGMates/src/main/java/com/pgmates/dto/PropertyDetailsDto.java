package com.pgmates.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PropertyDetailsDto {
	 private int propertyId;
	    private String location;
	    private double rent;  
	    private String type;
	    private double deposit;    
	    private String image;
	    private int capacity;
	    private String amenities;
	    private String nearByPlaces;
	    private String forGender;
	    private String furnishType;
	    private OwnerDto owner;
	    private List<ReviewsDto> reviews;
	    private List<AppointmentsDto> Appointments;
	    
}
