import React from 'react';
import { Link } from "react-router-dom";
import { ViewUsers, ViewBooks, ManageExchangeRequests, PromoteDemoteUser, DeleteUser } from './AdminComponents';

const AdminDashboard = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/search-books">Book Exchange - Admin DashBoard</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ViewUsers />
            <ViewBooks />
            {/* <ManageExchangeRequests />
            <PromoteDemoteUser />
            <DeleteUser /> */}
        </div>
    );
};

export default AdminDashboard;
