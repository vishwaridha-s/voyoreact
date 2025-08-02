import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewPlace() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/places/${id}`)
      .then(res => setPlace(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!place) return <p>Loading...</p>;

  return (
    <div className="p-6">
         <button
        className="bg-gray-700 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate('/places')}
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold">{place.name}</h1>
      <img
        src={`http://localhost:8080/places/image/${place.id}`}
        alt="Place"
        className="w-full max-w-lg h-auto my-4"
      />
      <p><strong>Location:</strong> {place.location}</p>
      <p><strong>Description:</strong> {place.description}</p>
      <p><strong>Price:</strong> ₹{place.price}</p>
    </div>
  );
}

export default ViewPlace;
