package com.pgmates.dto;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter

public class PropertyAdminDto {

	    private int propertyId;
	    private String location;
	    private double rent;  
	    private double deposit;
	    private String type;
	    private UserAdminDto owner;
	    private String image;
	    private int capacity;
	    private String amenities;
	    private String nearByPlaces;
	    private String forGender;
	    private String furnishType;
	    private AddressDto address;
}
