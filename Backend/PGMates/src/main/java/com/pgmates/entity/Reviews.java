package com.pgmates.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;
 
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // A user can write multiple reviews
    @Column(nullable = false,length = 500)
    private String comment; // The review comment
    @Column(nullable = false)
    private int ratings; // Rating given by the user
    
    @ManyToOne
    @JoinColumn(name = "property_id") // Reference to Property
    private Property property;
	public Reviews(int reviewId, User user, String comment, int ratings) {
		super();
		this.reviewId = reviewId;
		this.user = user;
		this.comment = comment;
		this.ratings = ratings;
	}


}
