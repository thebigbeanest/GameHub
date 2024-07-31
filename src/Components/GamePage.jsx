import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import Cookies from 'js-cookie';

const GamePage = () => {
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const iframeRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/games/${id}/`);
        setGame(response.data);
        setHtmlCode(response.data.html_code || '');
        setCssCode(response.data.css_code || '');
        setJsCode(response.data.js_code || '');
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/games/${id}/reviews/`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/games/${id}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchGame();
    fetchReviews();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (iframeRef.current && game) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument || iframe.contentWindow.document;

      if (document) {
        document.open();
        document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${game.title}</title>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>
              (function() {
                ${jsCode}
              })();
            </script>
          </body>
          </html>
        `);
        document.close();
      }
    }
  }, [game, htmlCode, cssCode, jsCode]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        const csrfToken = Cookies.get('csrftoken');
        await axios.delete(`http://localhost:8000/games/${id}/`, {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        });
        navigate('/games'); // Redirect to games list after deletion
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };

  const handleSave = async () => {
    try {
      const csrfToken = Cookies.get('csrftoken');
      await axios.put(
        `http://localhost:8000/games/${id}/`,
        {
          title: game.title,
          description: game.description,
          html_code: htmlCode,
          css_code: cssCode,
          js_code: jsCode,
          image_url: game.image_url,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

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
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.user.username}:</strong> {review.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Comments:</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>{comment.user.username}:</strong> {comment.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Modify'}
      </button>
      {isEditing && (
        <div>
          <div>
            <label>HTML Code:</label>
            <Editor
              height="200px"
              language="html"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || '')}
            />
          </div>
          <div>
            <label>CSS Code:</label>
            <Editor
              height="200px"
              language="css"
              value={cssCode}
              onChange={(value) => setCssCode(value || '')}
            />
          </div>
          <div>
            <label>JavaScript Code:</label>
            <Editor
              height="200px"
              language="javascript"
              value={jsCode}
              onChange={(value) => setJsCode(value || '')}
            />
          </div>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
      <button onClick={handleDelete} style={{ marginTop: '20px' }}>
        Delete Game
      </button>
    </div>
  );
};

export default GamePage;


