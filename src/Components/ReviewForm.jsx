import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ review, rating });
        setReview('');
        setRating(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review"
            ></textarea>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
