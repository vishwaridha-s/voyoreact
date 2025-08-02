import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/voyo/register', form);
      alert("Registered successfully");
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="block mb-2 p-2 border w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="block mb-2 p-2 border w-full"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="block mb-4 p-2 border w-full"
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white w-full">
          Register
        </button>
      </form>
      
      {/* Redirect to login */}
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <button
          className="text-blue-600 underline"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
