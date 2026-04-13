import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewPlace() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://voyoge.onrender.com/places/${id}`)
      .then(res => setPlace(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!place) return (
    <div className="flex justify-center items-center min-h-screen">
       <div className="animate-fade-in text-center">
          <p style={{ fontSize: '3rem' }}>🔍</p>
          <p className="text-muted">Uncovering destination details...</p>
       </div>
    </div>
  );

  return (
    <div className="animate-fade-in page-wrapper" style={{ maxWidth: '800px' }}>
      <button
        className="btn btn-secondary mb-8"
        onClick={() => navigate('/places')}
      >
        ← Back to Dashboard
      </button>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <img
          src={`https://voyoge.onrender.com/places/image/${place.id}`}
          alt={place.location}
          style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
        />
        
        <div style={{ padding: '2.5rem' }}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl title-gradient" style={{ marginBottom: '0.5rem' }}>{place.location}</h1>
              <p className="badge badge-pink">₹{place.price} per trip</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="form-label">About this destination</h3>
            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              {place.description}
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', display: 'flex', gap: '2rem' }}>
            <div>
              <p className="form-label" style={{ marginBottom: '0.2rem' }}>Status</p>
              <p style={{ fontWeight: 'bold', color: 'var(--primary-dark)' }}>Verified Location ✨</p>
            </div>
            <div>
              <p className="form-label" style={{ marginBottom: '0.2rem' }}>Experience</p>
              <p style={{ fontWeight: 'bold', color: 'var(--primary-dark)' }}>Magical Adventure 🌿</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPlace;
