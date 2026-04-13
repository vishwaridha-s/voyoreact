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
    axios.get(`https://voyoge.onrender.com/user-places/mylist/${userId}`)
      .then(res => setBucketList(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (placeId) => {
    axios.delete(`https://voyoge.onrender.com/removefromlist/${userId}/${placeId}`)
      .then(() => {
        fetchBucketList();
      })
      .catch(err => console.error("Error deleting place: ", err));
  };

  return (
    <div className="animate-fade-in">
      <UserNavBar />
      <div className="page-wrapper">
        <header className="mb-8">
          <h1 className="text-3xl title-gradient">My Bucket List 🎒</h1>
          <p className="text-muted">Places you dream of visiting someday...</p>
        </header>

        {bucketList.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '3rem' }}>✨</p>
            <p className="text-muted">Your bucket list is waiting for its first adventure!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {bucketList.map(place => (
              <div key={place.id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                   <h2 className="text-xl" style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                    📍 {place.location}
                  </h2>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {place.description}
                  </p>
                  <p className="badge badge-pink" style={{ marginTop: '1rem', display: 'inline-block' }}>
                     Budget: ₹{place.price}
                  </p>
                </div>
                
                <button
                  onClick={() => handleDelete(place.id)}
                  className="btn btn-primary w-full"
                  style={{ marginTop: 'auto' }}
                >
                  Mark as Visited ✅
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
