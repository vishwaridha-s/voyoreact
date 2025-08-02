import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function UserNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'View Destinations', path: '/user-places' },
    { label: 'My Bucket List', path: '/mybucket' },
    { label: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="flex justify-between items-center bg-black p-4 mb-6 border-b border-orange-500">
      {navItems.map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`px-4 py-2 mx-2 rounded font-bold text-lg transition
            ${location.pathname === item.path
              ? 'bg-orange-500 text-white'
              : 'bg-black text-white border border-white hover:bg-orange-500 hover:text-white'}
          `}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default UserNavBar;