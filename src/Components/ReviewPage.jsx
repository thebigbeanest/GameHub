import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ReviewPage() {
    const [reviews, setReviews] = useState([]);

    let navigate = useNavigate();
    const showReview = (reviewID) => {
        navigate(`${reviewID}`);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const responseReviews = await axios.get('http://127.0.0.1:8000/reviews');
                console.log('data', responseReviews);
                setReviews(responseReviews.data);
            } catch (error) {
                console.error('Error fetching the reviews:', error);
            }
        };
        getData();
    }, []);

    console.log(reviews);

    if (!reviews.length) {
        return <h1>Loading... please wait</h1>;
    } else {
        return (
            <div className="objectList">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="objectItem"
                        onClick={() => showReview(review.id)}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${review.image_url})`,
                            backgroundSize: '600px',
                            backgroundPosition: 'center 30%',
                        }}
                    >
                        <h2>{review.title}</h2>
                        <h3>Game: {review.game_name}</h3>
                        <p>Rating: {review.rating}</p>
                        <p>Review: {review.content}</p>
                    </div>
                ))}
            </div>
        );
    }
}