import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import pp from '../asset/profile.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Indosine</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Recipes</Link>
        <Link to="/add-recipe">+</Link>
        <Link to="/profile">
          <img src={pp} alt="Profile" className="profile-picture" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
