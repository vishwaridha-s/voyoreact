import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const { path, userId } = res.data;
      localStorage.setItem("userId", userId);
      navigate(path);
    } catch (error) {
      console.error(error);
      alert("Login failed");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="block mb-2 p-2 border" />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="block mb-2 p-2 border" />
      <button type="submit" className="p-2 bg-green-500 text-white">Login</button>
    </form>
  );
}

export default Login;
