import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';

function UserPlaces() {
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchAllPlaces = () => {
    axios.get('https://voyoge.onrender.com/user-places/places')
      .then(res => setPlaces(res.data))
      .catch(err => console.error(err));
  };

  const handleSearch = () => {
    if (keyword.trim() === '') {
      fetchAllPlaces();
      return;
    }

    axios.get(`https://voyoge.onrender.com/user-places/places/search?keyword=${keyword}`)
      .then(res => setPlaces(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  const handleAdd = (placeId) => {
    axios.post(`https://voyoge.onrender.com/user-places/addtolist/${userId}/${placeId}`)
      .then(() => alert("Added to Bucket List"))
      .catch(err => console.error(err));
  };

  return (
    <div className="animate-fade-in">
      <UserNavBar />
      <div className="page-wrapper">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl title-gradient">Dreamy Destinations</h1>
            <p className="text-muted">Find your next cozy adventure ✨</p>
          </div>
        </header>

        <section className="card mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Search for a magical place..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="input-field"
          />
          <button onClick={handleSearch} className="btn btn-primary" style={{ minWidth: '120px' }}>
            Search 🔍
          </button>
        </section>

        <div className="grid grid-cols-3 gap-6">
          {places.length === 0 ? (
             <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                <p style={{ fontSize: '3rem' }}>☁️</p>
                <p className="text-muted">No places found. Maybe try another keyword?</p>
             </div>
          ) : (
            places.map(place => (
              <div key={place.id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={`https://voyoge.onrender.com/places/image/${place.id}`}
                    alt={place.location}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                  />
                  <span className="badge badge-pink" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    ₹{place.price}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl" style={{ marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
                    📍 {place.location}
                  </h2>
                  <p className="text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {place.description}
                  </p>
                </div>
                <button
                  onClick={() => handleAdd(place.id)}
                  className="btn btn-primary w-full"
                  style={{ marginTop: 'auto' }}
                >
                  Add to Bucket List 🎒
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPlaces;
