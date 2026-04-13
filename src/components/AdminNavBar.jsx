import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AdminNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="top-nav" style={{ margin: '1rem' }}>
      <div className="nav-brand" onClick={() => navigate('/places')}>
        <span className="brand-icon">🎀</span>
        <div>
          <p className="brand-label">Admin Panel</p>
          <p className="brand-subtitle">Management</p>
        </div>
      </div>

      <div className="nav-links">
        <button 
          className={`nav-pill ${location.pathname === '/places' ? 'active' : ''}`} 
          onClick={() => navigate('/places')}
        >
          Destinations 🏠
        </button>
        <button 
          className={`nav-pill ${location.pathname === '/places/add' ? 'active' : ''}`} 
          onClick={() => navigate('/places/add')}
        >
          Add Place ➕
        </button>
        <button 
          className={`nav-pill ${location.pathname === '/admin/profile' || location.pathname === '/profile' ? 'active' : ''}`} 
          onClick={() => navigate('/profile')}
        >
          Profile 👤
        </button>
      </div>

      <button type="button" className="nav-logout" onClick={handleLogout}>
        Logout 🚪
      </button>
    </nav>
  );
}

export default AdminNavBar;
