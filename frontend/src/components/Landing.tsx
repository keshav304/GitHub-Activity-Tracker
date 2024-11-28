import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { useAuth } from '../context/AuthContext';  

const Landing: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); 
  const navigate= useNavigate()
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-heading">GitHub Activity Tracker</h1>
          <ul className="navbar-links">
            {isAuthenticated ? (
              <li>
                <button onClick={logout} className="navbar-link">Logout</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="navbar-link">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="navbar-link">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      
      <div className="hero-section">
        <div className="hero-content">
          <h2 className="hero-heading">Welcome to GitHub Activity Tracker</h2>
          <p className="hero-description">
            Track and analyze your GitHub activity with ease. Stay updated with the latest releases of your repositories and manage your GitHub data more effectively.
          </p>
          
          <h3 className="feature-heading">Key Features:</h3>
          <ul className="feature-list">
            <li>
              <strong>Track Repositories:</strong> Add GitHub repository URLs to monitor their updates, and keep track of all changes across your sessions. Data is stored securely in PostgreSQL, ensuring persistence.
            </li>
            <li>
              <strong>Latest Release Details:</strong> Get detailed information on repository names, descriptions, and the latest release version and date. New updates are visually highlighted for easy tracking.
            </li>
            <li>
              <strong>Mark as Seen:</strong> Mark releases as "seen" to keep track of which updates you have reviewed. Repositories with unseen updates are visually distinct for easy identification.
            </li>
            <li>
              <strong>Data Reload:</strong> Refresh your repository list to fetch the latest data, ensuring you're always up-to-date with your GitHub activity.
            </li>
          </ul>

          <p className="hero-call-to-action" onClick={()=>{
            navigate('/signup')
          }}>
            Sign up now to start tracking your GitHub repositories and stay ahead of the game!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
