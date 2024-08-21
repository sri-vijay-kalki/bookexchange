import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ children }) => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/search-books">Book Exchange</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-book">Add Book</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search-books">Search Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-requests">Requests Made by Me</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/requests-for-me">Requests for Me</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-posting">My Postings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        {children}
        </>
    );
}

export default Navbar;
