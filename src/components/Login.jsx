import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/voyo/login', form);

      const user = res.data;

      localStorage.setItem('userId', user.userId);

      navigate(user.path);

    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-shell">
        <div className="login-header">
          <div className="login-emoji">💖</div>
          <div>
            <p className="login-subtitle">Welcome back to Voyo</p>
            <h2>Login to your cozy travel diary</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              type="text"
              name="username"
              placeholder="Enter username"
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
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="btn-primary">
            Open your cute map
          </button>
        </form>

        <div className="register-login-link">
          Don’t have an account yet?{' '}
          <button className="btn-link" onClick={() => navigate('/register')} type="button">
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;