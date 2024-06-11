import React from 'react';
import './Header.css';
import logo from '../asset/Indosine Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Indosine Logo" className="header-logo" />
      </div>
      <nav className="header-nav">
        <Link to="" className="header-link">Home</Link>
        <Link to="recipe-page" className="header-link">Recipes</Link>
      </nav>
      <div className="header-icons">
        <span className="header-icon">👤</span>
        <Link to="add-recipe" className="header-icon">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
