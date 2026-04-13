import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPlace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState({ name: '', location: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  

  useEffect(() => {
    axios.get(`https://voyoge.onrender.com/places/${id}`)
      .then(res => setPlace(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('updatedPlace', new Blob([JSON.stringify(place)], { type: 'application/json' }));
    if (image) formData.append('image', image);

    try {
      await axios.put(`https://voyoge.onrender.com/places/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/places');
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="text-3xl title-gradient">Edit Destination</h1>
          <p className="text-muted">Refining the details of your adventure 📝</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="form-label">Location</label>
            <input
              type="text"
              placeholder="Location"
              value={place.location}
              onChange={(e) => setPlace({ ...place, location: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Description"
              value={place.description}
              onChange={(e) => setPlace({ ...place, description: e.target.value })}
              className="input-field"
              style={{ minHeight: '100px' }}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              placeholder="Price"
              value={place.price}
              onChange={(e) => setPlace({ ...place, price: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="form-label">New Image (Optional)</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="input-field"
              style={{ padding: '0.6rem' }}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
            Save Changes ✨
          </button>
        </form>

        <button
          className="btn btn-secondary w-full"
          style={{ marginTop: '1rem' }}
          onClick={() => navigate('/places')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPlace;
