import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddPlaces.css";

function AddPlace() {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    price: '',
    image: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select an image.");
      return;
    }

    const data = new FormData();

    const placesData = {
      location: formData.location,
      description: formData.description,
      price: formData.price
    };


    data.append(
      "places",
      new Blob([JSON.stringify(placesData)], { type: "application/json" })
    );

    data.append("image", formData.image);

    try {
      const res = await axios.post(
        "https://voyoge.onrender.com/places/add",
        data
      );

      alert("Place added successfully!");
      navigate('/places');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to add place.");
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="text-3xl title-gradient">Add a New Place</h1>
          <p className="text-muted">Share a magical spot with others 🌿</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Kyoto, Japan"
              value={formData.location}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              placeholder="What makes this place special?"
              value={formData.description}
              onChange={handleChange}
              required
              className="input-field"
              style={{ minHeight: '120px', resize: 'vertical' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              placeholder="Price for the journey"
              value={formData.price}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label">Cover Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="input-field"
              style={{ padding: '0.6rem' }}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
            Publish Place ✨
          </button>
        </form>

        <button
          className="btn btn-secondary w-full"
          style={{ marginTop: '1rem' }}
          onClick={() => navigate('/places')}
        >
          Cancel & Return
        </button>
      </div>
    </div>
  );
}

export default AddPlace;