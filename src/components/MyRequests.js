import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { getMyRequests } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const { userId, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const getReq = async () => {
            const response = await getMyRequests(userId, token);
            if (response.status === 401) {
                alert("Invalid credentials");
                navigate("/login");
            } else if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                console.error("Failed to fetch requests");
            }
        };
        getReq();
    }, [userId, token, navigate]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Requests Made by Me</h2>
            {requests.length === 0 ? (
                <div className="alert alert-info text-center">
                    <p className="mb-0">You have no requests.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Book Author</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.bookTitle}</td>
                                    <td>{request.bookAuthor}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyRequests;
