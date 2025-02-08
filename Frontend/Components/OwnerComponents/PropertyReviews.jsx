import React from 'react';
import './OwnerCSS/PropertyReviews.css';
function PropertyReviews({ reviews }) {
    return (
        <div className="reviews-container">
          <h2>⭐ Property Reviews</h2>
          {reviews && reviews.length > 0 ? (  // Check if reviews exist
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <span className="user-avatar">{review.user.firstName[0]}</span>
                  <div>
                    <h4>{review.user.firstName} {review.user.lastName} : <a className="review-comment">" {review.comment}" {review.ratings}⭐ </a></h4>                   
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews available</p>
          )}
        </div>
      );
}

export default PropertyReviews;
