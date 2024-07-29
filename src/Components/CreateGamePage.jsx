import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Editor } from '@monaco-editor/react';
import '../CreateGamePage.css';




function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }


const CreateGamePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument || iframe.contentWindow.document;
      document.open();
      document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
        </html>
      `);
      document.close();
    }
  }, [htmlCode, cssCode, jsCode]);

  const handleSubmit = async () => {
    try {
      const csrfToken = getCookie('csrftoken');
  
      const response = await axios.post(
        'http://127.0.0.1:8000/admin/GameHubApp/game/', // Make sure this is your correct API endpoint
        {
          title,
          description,
          html_code: htmlCode,
          css_code: cssCode,
          js_code: jsCode,
          image_url: imageUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );
      console.log('Game uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading game:', error);
      // Optional: Display error message to the user
    }
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setHtmlCode('');
    setCssCode('');
    setJsCode('');
    setImageUrl('');
  };

  return (
    <div className="container">
      <h1>Create a New Game</h1>
      <div className="input-container">
        <div className="input-box">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="input-box">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="input-box">
          <label>Image URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
      </div>
      <div className="code-container">
        <div className="code-box">
          <label>HTML Code:</label>
          <Editor
            height="300px"
            language="html"
            value={htmlCode}
            onChange={(value) => setHtmlCode(value || '')}
          />
        </div>
        <div className="code-box">
          <label>CSS Code:</label>
          <Editor
            height="300px"
            language="css"
            value={cssCode}
            onChange={(value) => setCssCode(value || '')}
          />
        </div>
        <div className="code-box">
          <label>JavaScript Code:</label>
          <Editor
            height="300px"
            language="javascript"
            value={jsCode}
            onChange={(value) => setJsCode(value || '')}
          />
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Save Game</button>
      </div>
      <iframe
        ref={iframeRef}
        style={{ width: '100%', height: '500px', border: '1px solid black' }}
        title="preview"
      />
    </div>
  );
};

export default CreateGamePage;