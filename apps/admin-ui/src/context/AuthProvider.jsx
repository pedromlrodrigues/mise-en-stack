import { useState, useEffect, useCallback } from 'react';

import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { AuthContext } from './authContext';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const decodeAndSetUser = useCallback((authToken) => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setUser({ _id: decoded.id, username: decoded.username, role: decoded.role });
        return decoded;
      } catch (error) {
        console.error('Failed to decode token or token is invalid:', error);
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
        return null;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      const decoded = decodeAndSetUser(storedToken);
      if (decoded && decoded.exp * 1000 < Date.now()) {
        console.log('Token expired. Logging out automatically.');
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
      } else if (decoded) {
        setToken(storedToken);
      }
    }
    setLoading(false);
  }, [decodeAndSetUser]);

  const login = useCallback(
    (userData, authToken) => {
      localStorage.setItem('adminToken', authToken);
      setToken(authToken);
      setUser(userData);
      navigate('/admin/dashboard');
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setUser(null);
    navigate('/admin/login');
  }, [navigate]);

  const isAuthenticated = !!token && !!user;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
