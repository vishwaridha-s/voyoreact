import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://voyoge.onrender.com/voyo/register', form);
      alert('Registered successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div className="landing-page">
      <div className="floating-unicorn">🦄</div>
      <div className="landing-grid">
        <section className="hero-card">
          <div className="hero-badge">About</div>
          <h1>Voyo makes travel memories cute, cozy, and unforgettable.</h1>
          <p>
            Sign up to save dreamy places, cute notes, colorful travel reviews, and keep your journey
            in one playful travel diary.
          </p>

          <div className="hero-features">
            <div className="feature-pill">✨ Cute Travel Journal</div>
            <div className="feature-pill">📸 Memories with Images</div>
            <div className="feature-pill">💌 Personalized Notes</div>
            <div className="feature-pill">🌈 Download as PDF</div>
          </div>

          <div className="hero-stat-grid">
            <div className="stat-card">
              <span>☁️</span>
              <div>
                <strong>Playful</strong>
                <p>wander</p>
              </div>
            </div>
            <div className="stat-card">
              <span>🌸</span>
              <div>
                <strong>Filled</strong>
                <p>dream</p>
              </div>
            </div>
            <div className="stat-card">
              <span>💖</span>
              <div>
                <strong>Fun</strong>
                <p>discover</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="register-panel">
          <div className="panel-top">
            <div className="panel-emoji">🎀</div>
            <div>
              <p className="panel-label">Welcome to Voyo</p>
              <h2>Create your cute account</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="Pick a sweet name"
                value={form.username}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Secret password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Role
              <select name="role" value={form.role} onChange={handleChange} required>
                <option value="">Choose your role</option>
                <option value="user">Adventurer</option>
                <option value="admin">Glow Keeper</option>
              </select>
            </label>
            <button type="submit" className="btn-primary">
              Join the adventure
            </button>
          </form>

          <div className="register-login-link">
            Already have a cute account?{' '}
            <button className="btn-link" onClick={() => navigate('/login')} type="button">
              Login
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Register;
