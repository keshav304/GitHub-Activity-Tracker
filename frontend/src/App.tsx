// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { AuthProvider } from './context/AuthContext';
import Landing from './components/Landing';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import "./styles.css";
const App: React.FC = () => {
  return (
    <AuthProvider>
        <Router>
          <Routes> 
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={<DashboardPage />}
                />
              }
            />
          </Routes>
        </Router>
    </AuthProvider>
  );
};

export default App;
