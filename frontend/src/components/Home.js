import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
  return (
    <>
      <nav>
        <div className="logo">⚡ AI Study Buddy</div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Sign In</Link>
          <Link to="/signup">Create Account</Link>
        </div>
      </nav>
      <div className="main-content">
        <h1>A New Way to Learn</h1>
        <p>
          AI Study Buddy helps you enhance your skills, track your growth, and get ready for tech interviews — all in one place.
        </p>
        <Link className="btn" to="/signup">Create Account →</Link>
        <p style={{ marginTop: "1rem" }}>Start exploring now and level up! 🚀</p>
      </div>
    </>
  );
};

export default Home;
