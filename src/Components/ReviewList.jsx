import React, { useState, useEffect } from 'react';

const ReviewList = ({ reviews = [] }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Reviews received:", reviews); // Log the reviews data
        if (reviews.length > 0) {
            setLoading(false);
        }
    }, [reviews]);

    return (
        <div>
            <h3>Reviews:</h3>
            {loading ? (
                <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p>{review.text}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
};

export default ReviewList;
