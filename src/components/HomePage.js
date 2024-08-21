import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to the Book Exchange Platform</h1>
      <p className="lead mb-4">
        Discover a world of books where you can exchange your old books for new reads. Join our community to share, swap, and enjoy a variety of books with others.
      </p>
      <div className="d-flex justify-content-center">
        {/* <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/register" className="btn btn-primary btn-lg">Register</Link>
          </li>
          <li>
            <Link to="/login" className="btn btn-secondary btn-lg">Login</Link>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default HomePage;
