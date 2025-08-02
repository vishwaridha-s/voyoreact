import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavBar from './UserNavBar';

function MyBucketList() {
  const [bucketList, setBucketList] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchBucketList();
  }, [userId]);

  const fetchBucketList = () => {
    axios.get(` https://voyo.onrender.com/user-places/mylist/${userId}`)
      .then(res => setBucketList(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (placeId) => {
    axios.delete(` https://voyo.onrender.com/user-places/removefromlist/${userId}/${placeId}`)
      .then(() => {
        fetchBucketList();
      })
      .catch(err => console.error("Error deleting place: ", err));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <UserNavBar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-orange-500">My Bucket List</h1>
        {bucketList.length === 0 ? (
          <p className="text-white">No places in your bucket list.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bucketList.map(place => (
              <div key={place.id} className="p-4 border border-orange-500 rounded shadow bg-black text-white">
                <h2 className="text-lg font-semibold text-orange-500">{place.location}</h2>
                <p>{place.description}</p>
                <p className="font-semibold text-orange-400">₹{place.price}</p>
                <button
                  onClick={() => handleDelete(place.id)}
                  className="mt-4 bg-orange-500 text-white px-3 py-1 rounded hover:bg-white hover:text-orange-500 border border-orange-500"
                >
                  Mark as Visited
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBucketList;
