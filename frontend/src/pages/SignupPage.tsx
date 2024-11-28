import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useAuth } from '../context/AuthContext'; 
import { signUpUser } from '../services/authService'; 

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signUpUser(email, password); 
      console.log(data)
      login(data.signup.token);
      navigate('/dashboard', { replace: true }) 

    } catch (err) {
      setError('Sign up failed, please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-heading">Sign Up</h1>
        <form onSubmit={handleSignUp} className="auth-form">
          <div className="auth-input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
