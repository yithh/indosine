import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AddRecipe from './pages/AddRecipe';
import RecipePage from './pages/RecipePage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />  
          <Route path="/search" element={<SearchPage />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
