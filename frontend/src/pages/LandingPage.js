import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import cuate from '../asset/cuate.png';
import explore from '../asset/explore.png';
import filter from '../asset/filter.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/search');
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-text">
          <h1>Explore flavorful <span>Indonesia</span></h1>
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get started
          </button>
        </div>
        <div className="hero-image">
          <img src={cuate} alt="Cooking illustration" />
        </div>
      </section>

      <section className="highlight-section">
        <div className="highlight-images">
          <img src={explore} alt="Discover Indonesia's Best Dishes" />
        </div>
        <div className="highlight-text">
          <h2>Discover <span>Indonesia's</span> Best Dishes</h2>
        </div>
      </section>

      <section className="filter-section">
        <h2>Filter Recipes by <span>Your Ingredients</span></h2>
        <div className="filter-container">
          <img src={filter} alt="Filter Recipes by Your Ingredients" />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
              <h3>Explore Indosine</h3>
              <a href="#forums">Forums</a>
              <a href="#recipes">Recipes</a>
              <a href="#join">Join us!</a>
            </div>
            <div className="footer-column">
              <h3>Useful Links</h3>
              <a href="#account">Your Account</a>
              <a href="#posts">Your Posts</a>
              <a href="#help">Help</a>
            </div>
            <div className="footer-column">
              <h3>Contact</h3>
              <p>Phone: +XX XXXX XXXX</p>
              <p>Email: info@indosine.com</p>
            </div>
            <div className="footer-column">
              <h3>Follow us</h3>
              <a href="#instagram">Instagram</a>
              <a href="#twitter">Twitter</a>
              <a href="#youtube">YouTube</a>
            </div>
          </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Copyright: Indosine</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
