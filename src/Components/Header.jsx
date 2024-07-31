import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
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
      <nav className="navbar">
        <Link to="/category/mmo">MMO</Link>
        <Link to="/category/strategy">Strategy</Link>
        <Link to="/category/shooting">Shooting</Link>
        <Link to="/category/action">Action</Link>
        <Link to="/category/adventure">Adventure</Link>
        <Link to="/category/puzzle">Puzzle</Link>
        <Link to="/category/tower-defense">Tower Defense</Link>
        <Link to="/category/idle">Idle</Link>
        <Link to="/category/more">More</Link>
        <Link to="/forums">Forums</Link>
        <Link to="/developer-portal">Developer Portal</Link>
      </nav>
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
