import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="main-content">
      <h1>Welcome to UtilityHub</h1>
      <p>Your all-in-one solution for QR codes, PDF tools, and financial calculators</p>
      
      <div className="feature-cards">
        <div className="feature-card">
          <h3>QR Generator</h3>
          <p>Create custom QR codes for URLs, text, contact information and more.</p>
          <Link to="/qr" className="btn">Generate QR</Link>
        </div>
        
        <div className="feature-card">
          <h3>PDF Tools</h3>
          <p>Convert, merge, split and edit PDF files with our powerful tools.</p>
          <Link to="/pdf" className="btn">PDF Tools</Link>
        </div>
        
        <div className="feature-card">
          <h3>Financial Calculators</h3>
          <p>Calculate EMI, SIP, loan payments and other financial metrics.</p>
          <Link to="/calculators" className="btn">Calculators</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;