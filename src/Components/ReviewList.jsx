import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h3>Reviews:</h3>
            {reviews.map((review, index) => (
                <div key={index} className="review">
                    <p>{review.text}</p>
                    <p>Rating: {review.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
