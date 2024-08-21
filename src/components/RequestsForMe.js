import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { getRequestsForMe, updateRequestStatus } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequestsForMe = () => {
    const [requests, setRequests] = useState([]);
    const { userId, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            fetchRequest();
        };
        fetchRequests();
    }, []);
    const fetchRequest = async () => {
        try {
            const response = await getRequestsForMe(userId, token);
            if (response.status === 401) {
                alert("Invalid credentials");
                navigate("/login");
            } else if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                console.error("Failed to fetch requests");
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    }

    const handleUpdateStatus = async (requestId, status) => {
        try {
            const response = await updateRequestStatus(requestId, status, token);
            if (response.ok) {
                // Update the local state to reflect the change
                fetchRequest();
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Requests Made for Me</h2>
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
                                <th>Requester</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.bookTitle}</td>
                                    <td>{request.bookAuthor}</td>
                                    <td>{request.requesterName}</td>
                                    <td>{request.status}</td>
                                    <td>
                                        {request.status === 'PENDING' && (
                                            <>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleUpdateStatus(request.id, 'ACCEPTED')}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleUpdateStatus(request.id, 'REJECTED')}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RequestsForMe;
