import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css"; 
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserPlaces from './components/UserPlaces';
import AddPlace from './components/AddPlace';
import EditPlace from './components/EditPlace';
import ViewPlace from './components/ViewPlace';
import Profile from './components/Profile'; 
import MyBucketList from './components/MyBucketList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/places" element={<AdminDashboard />} />
        <Route path="/places/add" element={<AddPlace />} />

        <Route path="/user-places" element={<UserPlaces />} />
        <Route path="/places/edit/:id" element={<EditPlace />} />
        <Route path="/places/view/:id" element={<ViewPlace />} />
         <Route path="/admin/profile" element={<Profile />} /> 
         <Route path="/mybucket" element={<MyBucketList />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
