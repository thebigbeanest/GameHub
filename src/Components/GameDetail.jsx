import React from 'react';

const GameDetail = ({ game }) => {
    return (
        <div>
            <h1>{game.title}</h1>
            <p>{game.description}</p>
            <h3>Reviews:</h3>
            {/* This component will likely include a list of reviews */}
        </div>
    );
};

export default GameDetail;
