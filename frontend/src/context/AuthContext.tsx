import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getToken, saveToken, removeToken, decodeToken } from '../utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: any;
  loading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Initialize loading state

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      const decoded = decodeToken(token);
      setUser(decoded);
    }
    setLoading(false);  
  }, []); 

  const login = (token: string) => {
    saveToken(token);
    setIsAuthenticated(true);
    const decoded = decodeToken(token);
    setUser(decoded);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
