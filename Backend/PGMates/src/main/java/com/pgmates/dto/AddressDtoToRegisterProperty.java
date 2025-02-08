package com.pgmates.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDtoToRegisterProperty {
	
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String pincode;
}
