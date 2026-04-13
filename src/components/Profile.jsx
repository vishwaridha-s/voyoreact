import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import AdminNavBar from './AdminNavBar';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [memories, setMemories] = useState([]);
  const [loadingMemories, setLoadingMemories] = useState(true);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const apiBase = 'http://localhost:8080';

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    axios.get(`${apiBase}/voyo/user/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Failed to load user profile', err);
        navigate('/login');
      });

    axios.get(`${apiBase}/memories/user/${userId}`)
      .then(res => setMemories(res.data))
      .catch(err => console.error('Failed to load memories', err))
      .finally(() => setLoadingMemories(false));
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const openMemories = () => {
    navigate('/memories');
  };

  if (!user) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-fade-in text-center">
        <p style={{ fontSize: '3rem' }}>✨</p>
        <p className="text-muted">Loading your profile...</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {user.role === 'admin' ? <AdminNavBar /> : <UserNavBar />}
      <div className="page-wrapper" style={{ maxWidth: '800px' }}>
        <header className="mb-8 text-center">
          <h1 className="text-4xl title-gradient">Hello, {user.username}! 🎀</h1>
          <p className="text-muted">Welcome to your personal travel hub</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <section className="card flex justify-between items-center">
            <div>
              <p className="form-label">Account Role</p>
              <p className="text-xl" style={{ color: 'var(--primary-dark)', textTransform: 'capitalize' }}>{user.role}</p>
            </div>
            {user.role !== 'admin' && (
              <div>
                <p className="form-label">Journal Entries</p>
                <p className="text-xl" style={{ color: 'var(--primary-dark)' }}>{memories.length} Memories</p>
              </div>
            )}
            <div className="flex gap-2">
              {user.role !== 'admin' && (
                <button onClick={openMemories} className="btn btn-primary">My Diary 📔</button>
              )}
              <button onClick={handleLogout} className="btn btn-secondary">Logout 🚪</button>
            </div>
          </section>

          {user.role !== 'admin' && (
            <section className="card">
              <h2 className="text-2xl mb-6 title-gradient">Latest Snapshots</h2>
              {loadingMemories ? (
                <p className="text-muted text-center py-8">Gathering your memories...</p>
              ) : memories.length === 0 ? (
                <div className="text-center py-8">
                  <p style={{ fontSize: '2rem' }}>☁️</p>
                  <p className="text-muted">No memories yet. Start your first journey!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {memories.slice(0, 3).map(memory => (
                    <div key={memory.id} className="animate-fade-in">
                      <img
                        src={`${apiBase}/memories/image/${memory.id}`}
                        alt={memory.title}
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}
                      />
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-dark)' }}>{memory.title}</h4>
                      <p className="text-muted" style={{ fontSize: '0.75rem' }}>{memory.place?.location || 'Unknown'}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
