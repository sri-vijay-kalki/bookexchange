import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [userName, setUserName] = useState(() => localStorage.getItem('userName'));
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));


  useEffect(() => {
    // Check if there's a token in local storage on component mount
    const storedToken = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    const UserId = localStorage.getItem('userId');
    if (storedToken) {
      setToken(storedToken);
    }
    if (userName) {
      setUserName(userName);
    }
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const login = (userName, userId, newToken) => {
    setUserName(userName);
    setUserId(userId);
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setToken(null);
    setUserName(null);
    setUserId(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ userName, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
