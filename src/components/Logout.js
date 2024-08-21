import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Perform the logout and log status to the console
    const performLogout = async () => {
      try {
        await logout();
        console.log('User has been successfully logged out.');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    performLogout();
  }, [logout]);

  return (
    <div className="container mt-5 text-center">
      <h2>Logout Successful</h2>
      <p>You have been successfully logged out.</p>
      <div>
        <ul className="list-unstyled">
          <li><Link to="/register" className="btn btn-primary me-2">Register</Link></li>
          <li><Link to="/login" className="btn btn-secondary">Login</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Logout;
