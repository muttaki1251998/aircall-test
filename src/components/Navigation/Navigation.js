import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-item">
        Activity
      </Link>
      <Link to="/archive" className="nav-item">
        Archive
      </Link>
    </nav>
  );
};

export default Navigation;
