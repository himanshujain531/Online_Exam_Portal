import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('currentUser')) || null
  );

  const login = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);  // Set currentUser on login
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('currentUser', JSON.stringify(user));  // Save user to localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    if (storedAuth && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));  // Restore currentUser from localStorage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);