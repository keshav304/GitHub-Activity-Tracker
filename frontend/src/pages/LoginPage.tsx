import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../services/authService';  // Import GraphQL login mutation
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/auth';  

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);  
  const navigate = useNavigate();  
  const handleLogin = async () => {
    try {
      const { data } = await loginUser({ variables: { email, password } });

      saveToken(data.login.token);  
      navigate('/dashboard', { replace: true }) 
    } catch (e) {
      console.error('Login Error:', e);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-heading">Login</h1>
        <div className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="auth-input"
          />
          <button onClick={handleLogin} disabled={loading} className="auth-button">
            {loading ? 'Logging In...' : 'Login'}
          </button>
          {error && <p className="error-message">{error.message}</p>} 
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
