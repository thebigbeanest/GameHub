import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import CreateGamePage from './CreateGamePage';
import GameDetail from './GameDetail';
import GameList from './GameList';
import Header from './Header';
import Nav from './Nav';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import SignUp from './SignUp';
import GamePage from './GamePage';
import UserProfilePage from './UserProfilePage';
import ReviewPage from './ReviewPage';
import FileNotFound from './FileNotFound';

export default function Main() {
  return (
    <div className="main">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GameList" element={<GameList />} />
        <Route path="/Reviews/:reviewID" element={<ReviewPage />} />
        <Route path="/Reviews" element={<ReviewList />} />
        <Route path="/CreateGamePage" element={<CreateGamePage />} />
        <Route path="/UserProfile" element={<UserProfilePage />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="*" element={<FileNotFound />} />
      </Routes>
    </div>
  );
}