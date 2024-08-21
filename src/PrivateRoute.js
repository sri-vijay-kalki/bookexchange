import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './components/Navbar';

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();
  return token ? <Navbar>{element}</Navbar> : <Navigate to="/login" />;
};

export default PrivateRoute;
