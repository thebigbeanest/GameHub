import React from 'react';

const GameList = ({ games }) => {
    return (
        <div className="game-list">
            {games.map((game) => (
                <div key={game.id} className="game-thumbnail">
                    <h2>{game.title}</h2>
                    <p>Rating: {game.reviewScore}</p>
                </div>
            ))}
        </div>
    );
};

export default GameList;
