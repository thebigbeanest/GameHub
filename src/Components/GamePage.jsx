import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GamePage = () => {
  const [game, setGame] = useState(null);
  const iframeRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/games/${id}/`);
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();
  }, [id]);

  useEffect(() => {
    if (iframeRef.current && game) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument || iframe.contentWindow.document;
      
      if (document) {
        const html = (game.html_code || '').replace(/\r\n/g, '\n');
        const css = (game.css_code || '').replace(/\r\n/g, '\n');
        const js = (game.js_code || '').replace(/\r\n/g, '\n');

        document.open();
        document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${game.title}</title>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
          </html>
        `);
        document.close();
      }
    }
  }, [game]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <iframe
        ref={iframeRef}
        style={{ width: '100%', height: '500px', border: '1px solid black' }}
        title="Game Preview"
      />
      <div style={{ marginTop: '20px' }}>
        <h3>Reviews:</h3>
        {/* Display reviews here */}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Comments:</h3>
        {/* Display comments here */}
      </div>
    </div>
  );
};

export default GamePage;
