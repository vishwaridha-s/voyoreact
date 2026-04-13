import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function UserNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  const [role, setRole] = useState(localStorage.getItem('userRole') || 'user');

  useEffect(() => {
    if (userId && !localStorage.getItem('userRole')) {
      axios.get(`https://voyoge.onrender.com/voyo/user/${userId}`)
        .then(res => {
          setRole(res.data.role);
          localStorage.setItem('userRole', res.data.role);
        })
        .catch(err => console.error(err));
    }
  }, [userId]);

  const navItems = role === 'admin' 
    ? [
        { label: 'Destinations', path: '/places', icon: '🏛️' },
        { label: 'Add Place', path: '/places/add', icon: '➕' },
        { label: 'Profile', path: '/admin/profile', icon: '👤' }
      ]
    : [
        { label: 'Destinations', path: '/user-places', icon: '🌍' },
        { label: 'Bucket List', path: '/mybucket', icon: '🎒' },
        { label: 'Memories', path: '/memories', icon: '📸' },
        { label: 'Profile', path: '/profile', icon: '👤' }
      ];

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate(role === 'admin' ? '/places' : '/user-places');
  };

  return (
    <nav className="top-nav" style={{ margin: '1rem' }}>
      <div className="nav-brand" onClick={goToDashboard}>
        <span className="brand-icon">{role === 'admin' ? '🎀' : '✨'}</span>
        <div>
          <p className="brand-label">{role === 'admin' ? 'Admin Panel' : 'Voyo'}</p>
          <p className="brand-subtitle">{role === 'admin' ? 'Management' : 'cute travel diary'}</p>
        </div>
      </div>

      <div className="nav-links">
        {navItems.map(item => (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`nav-pill ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon" style={{ marginRight: '0.4rem' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <button type="button" className="nav-logout" onClick={handleLogout}>
        Log out 🚪
      </button>
    </nav>
  );
}

export default UserNavBar;