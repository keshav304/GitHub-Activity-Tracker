// src/components/LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';  

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();  
    navigate('/login'); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
