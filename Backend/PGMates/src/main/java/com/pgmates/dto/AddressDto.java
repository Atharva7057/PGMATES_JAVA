package com.pgmates.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddressDto {
	
		private int addressId;
	    private String addressLine1;
	    private String addressLine2;
	    private String city;
	    private String state;
	    private String pincode;
	    
		public AddressDto(int addressId, String addressLine1, String addressLine2, String city, String state,
				String pincode) {
			super();
			this.addressId = addressId;
			this.addressLine1 = addressLine1;
			this.addressLine2 = addressLine2;
			this.city = city;
			this.state = state;
			this.pincode = pincode;
		}
	    
}
