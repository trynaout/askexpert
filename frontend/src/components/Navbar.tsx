import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../state/atoms';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AskExpert.in</Link>
      </div>
      <div className="navbar-links">
        <Link to="/experts" className="nav-link">Experts</Link>
        {!user ? (
          <>
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        ) : (
          <>
            {user.role === 'expert' && (
              <Link to="/profile" className="nav-link">My Profile</Link>
            )}
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 