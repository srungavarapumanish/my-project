import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">UtilityHub</Link>
      </div>
      <div className="nav-links">
        <Link to="/qr">QR Generator</Link>
        <Link to="/pdf">PDF Tools</Link>
        <Link to="/calculators">Calculators</Link>
        <Link to="/about">About Us</Link>
        <Link to="/login">Login</Link>
      </div>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
};

export default Navbar;