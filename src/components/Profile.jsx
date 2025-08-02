import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`https://voyo.onrender.com/voyo/user/${userId}`)
        .then(res => setUser(res.data))
        .catch(err => console.error("Failed to load user profile", err));
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (!user) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Admin Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button 
        onClick={handleLogout} 
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
