import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPlace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState({ name: '', location: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  

  useEffect(() => {
    axios.get(` https://voyo.onrender.com/places/${id}`)
      .then(res => setPlace(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('updatedPlace', new Blob([JSON.stringify(place)], { type: 'application/json' }));
    if (image) formData.append('image', image);

    try {
      await axios.put(` https://voyo.onrender.com/places/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/places');
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <div className="p-6">
        <button
        className="bg-gray-700 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate('/places')}
      >
        Back to Dashboard
      </button>
      <h2 className="text-xl font-bold mb-4">Edit Place</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={place.name}
          onChange={(e) => setPlace({ ...place, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Location"
          value={place.location}
          onChange={(e) => setPlace({ ...place, location: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={place.description}
          onChange={(e) => setPlace({ ...place, description: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={place.price}
          onChange={(e) => setPlace({ ...place, price: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Place
        </button>
      </form>
    </div>
  );
}

export default EditPlace;
