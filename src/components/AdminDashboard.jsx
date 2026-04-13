import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import './AdminDashboard.css';

function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    axios.get('http://localhost:8080/places/all')
      .then(res => setPlaces(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      axios.delete(`http://localhost:8080/places/delete/${id}`)
        .then(() => {
          setPlaces(prev => prev.filter(place => place.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="animate-fade-in">
      <AdminNavBar />

      <div className="page-wrapper">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl title-gradient">Destinations Management</h1>
        </header>

        {places.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '3rem' }}>🍃</p>
            <p className="text-muted">Your travel map is currently empty.</p>
            <button onClick={() => navigate('/places/add')} className="btn btn-primary mt-4">
              Add your first place!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {places.map(place => (
              <div key={place.id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={`http://localhost:8080/places/image/${place.id}`}
                    alt={place.location}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                  />
                  <span className="badge badge-pink" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    ₹{place.price}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl" style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                    {place.location}
                  </h2>
                  <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                    {place.description}
                  </p>
                </div>
                <div className="flex gap-2" style={{ marginTop: 'auto' }}>
                  <button onClick={() => navigate(`/places/view/${place.id}`)} className="btn btn-secondary" style={{ flex: 1, padding: '0.6rem' }}>
                    View
                  </button>
                  <button onClick={() => navigate(`/places/edit/${place.id}`)} className="btn btn-outline" style={{ flex: 1, padding: '0.6rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(place.id)} className="btn btn-outline" style={{ flex: 1, padding: '0.6rem', borderColor: '#ff6b6b', color: '#ff6b6b' }}>
                    Delete
                  </button>
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
