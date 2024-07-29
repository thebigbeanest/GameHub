import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Nav from './Nav'
import axios from 'axios';

export default function Header() {
  let navigate = useNavigate();
  const [inputInProgress, setInputInProgress] = useState({ searchBar: '' });
  const [searchedGame, setSearchedGame] = useState('');

  const updateTyping = (e) => {
    setInputInProgress({ ...inputInProgress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchTerm = inputInProgress.searchBar;
    setInputInProgress({ searchBar: '' });
    try {
      const response = await axios.get(`http://127.0.0.1:8000/games/${searchTerm}`);
      setSearchedGame(response.data);
      navigate(`/games/${response.data.id}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="header">
      <h1>GameHub</h1>
      <button>
        <Link to='/CreateGamePage' className='neweventbutton'>Create Game</Link>
      </button>
      <form className="searchBar" onSubmit={handleSubmit}>
        <input
          name="searchBar"
          placeholder="Search Games"
          type="text"
          value={inputInProgress.searchBar}
          onChange={updateTyping}
          required
        />
        <button className="searchBtn">Search</button>
      </form>
    </div>
  );
}