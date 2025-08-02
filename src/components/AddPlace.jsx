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
    data.append("places", new Blob([JSON.stringify({
      location: formData.location,
      description: formData.description,
      price: formData.price
    })], { type: "application/json" }));

    data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost:8080/places/add", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Place added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to add place.");
    }
  };

  return (
    <div className="add-place-container">
      <h2 className="form-title">Add a New Place</h2>
      <form onSubmit={handleSubmit} className="add-place-form">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="form-textarea"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="form-file"
        />
        <button type="submit" className="submit-button">
          Add Place
        </button>
      </form>
      <button
        className="submit-button"
        style={{ marginTop: '1rem', background: '#ff8800', color: '#fff' }}
        onClick={() => navigate('/places')}
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default AddPlace;
