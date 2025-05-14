import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null); // 🔹 Ref for handling outside clicks

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">🚀 E-Deewar</h2>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/community">Community Forum</Link></li>
          <li><Link to="/chatbot">Chatbot</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>
          <li><Link to="/services">Services</Link></li>  
          <li><Link to="/register">Register</Link></li>

          {/* Profile Section */}
          <li className="profile-dropdown" ref={profileRef}>
            <button className="profile-button" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              👤 Profile
            </button>

            {isProfileOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">View Profile</Link>
                <button className="dropdown-item logout-btn" onClick={() => alert("Logging Out...")}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

