package com.pgmates.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ReviewInfo {
	private int userid;
	private int propertyid;
	private String comment;
	private int ratings;
}
