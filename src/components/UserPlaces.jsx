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
    axios.get('http://localhost:8080/user-places/places')
      .then(res => setPlaces(res.data))
      .catch(err => console.error(err));
  };

  const handleSearch = () => {
    if (keyword.trim() === '') {
      fetchAllPlaces();
      return;
    }

    axios.get(`http://localhost:8080/user-places/places/search?keyword=${keyword}`)
      .then(res => setPlaces(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  const handleAdd = (placeId) => {
    axios.post(`http://localhost:8080/user-places/addtolist/${userId}/${placeId}`)
      .then(() => alert("Added to Bucket List"))
      .catch(err => console.error(err));
  };

  return (
     <div><UserNavBar />
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Places</h1>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by location"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 rounded">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {places.map(place => (
          <div key={place.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{place.location}</h2>
            <p>{place.description}</p>
            <p className="font-semibold text-blue-700">₹{place.price}</p>
            <button
              onClick={() => handleAdd(place.id)}
              className="mt-3 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add to Bucket List
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default UserPlaces;
