import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/games/');
        if (Array.isArray(response.data)) {
          setGames(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      <h1>Games List</h1>
      {games.length > 0 ? (
        games.map((game) => (
          <div key={game.id} style={{ width: '200px', textAlign: 'center' }}>
            <h2>{game.title}</h2>
            <Link to={`/games/${game.id}`}>
              <img
                src={game.thumbnail || 'default-thumbnail.png'}
                alt={game.title}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </Link>
          </div>
        ))
      ) : (
        <p>No games available.</p>
      )}
    </div>
  );
};

export default GameList;
