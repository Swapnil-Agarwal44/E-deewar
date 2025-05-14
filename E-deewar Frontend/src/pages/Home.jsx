import React from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";

const Home = () => {
  return (
    <div className="home-container">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to E-Deewar Marketplace</h1>
        <p>Buy, sell, or rent anything across campus—books, stationery, electronics, and more!</p>
        <div className="cta-buttons">
          <Link to="/browse">
            <button className="cta-button">Browse Listings</button>
          </Link>
          <Link to="/sell">
            <button className="cta-button">Sell an Item</button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Quick Categories</h2>
        <div className="category-grid">
          <Link to="/browse?category=books" className="category-card">📚 Books</Link>
          <Link to="/browse?category=stationery" className="category-card">✏️ Stationery</Link>
          <Link to="/browse?category=electronics" className="category-card">💻 Electronics</Link>
          <Link to="/browse?category=instruments" className="category-card">🎸 Instruments</Link>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-listings">
        <h2>Featured Items</h2>
        <div className="item-grid">
          <div className="item-card">
            <h3>MacBook Air M1</h3>
            <p>Condition: Like New | ₹60,000</p>
          </div>
          <div className="item-card">
            <h3>Engineering Drawing Set</h3>
            <p>Condition: Good | ₹300</p>
          </div>
          <div className="item-card">
            <h3>Scientific Calculator</h3>
            <p>Condition: Excellent | ₹450</p>
          </div>
        </div>
        <Link to="/browse" className="explore-more-link">
          <button className="explore-more-button">See More →</button>
        </Link>
      </section>

      {/* Search and Filters */}
      <section className="search-section">
        <h2>Find What You Need</h2>
        <div className="search-controls">
          <input className="search-bar" type="text" placeholder="Search by name or category..." />
          <div className="filters">
            <select className="filter-dropdown">
              <option>Category</option>
              <option>Books</option>
              <option>Stationery</option>
              <option>Electronics</option>
            </select>
            <select className="filter-dropdown">
              <option>Type</option>
              <option>Sale</option>
              <option>Rent</option>
            </select>
            <input className="filter-dropdown" type="number" placeholder="Min Price" />
            <input className="filter-dropdown" type="number" placeholder="Max Price" />
            <button className="cta-button">Apply Filters</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
