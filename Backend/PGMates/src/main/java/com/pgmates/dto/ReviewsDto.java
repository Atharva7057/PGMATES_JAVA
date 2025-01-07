package com.pgmates.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReviewsDto {
	 private int reviewId; 
	    private UserDto user; 
	    private String comment; 
	    private int ratings;  
	    
	    public ReviewsDto(int reviewId, UserDto user, String comment, int ratings) {
	        this.reviewId = reviewId;
	        this.user = user;
	        this.comment = comment;
	        this.ratings = ratings;
	    }

}
