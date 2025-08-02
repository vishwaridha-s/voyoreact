import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    axios.get(' https://voyo.onrender.com/places/all')
      .then(res => setPlaces(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      axios.delete(` https://voyo.onrender.com/places/delete/${id}`)
        .then(() => {
          setPlaces(prev => prev.filter(place => place.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/admin/profile');
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="admin-nav-title" onClick={() => navigate('/places')}>
          Admin Dashboard
        </div>
        <div className="admin-nav-btns">
          <button onClick={() => navigate('/places/add')}>Add Place</button>
          <button onClick={goToProfile}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div>
        <h1 className="admin-nav-title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Destinations
        </h1>
        {places.length === 0 ? (
          <p>No places found.</p>
        ) : (
          <div className="place-cards">
            {places.map(place => (
              <div key={place.id} className="place-card">
                <img
                  src={`https://voyo.onrender.com/places/image/${place.id}`}
                  alt={place.location}
                />
                <h2>{place.location}</h2>
                <p>{place.description}</p>
                <p className="price">₹{place.price}</p>
                <div className="card-actions">
                  <button onClick={() => navigate(`/places/view/${place.id}`)}>View</button>
                  <button onClick={() => navigate(`/places/edit/${place.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(place.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
