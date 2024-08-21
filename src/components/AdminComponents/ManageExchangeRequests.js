import React, { useState, useEffect } from 'react';
import { getAllExchangeRequests, updateExchangeRequest } from '../../api';

const ManageExchangeRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getAllExchangeRequests();
            setRequests(data);
        };
        fetchRequests();
    }, []);

    const handleStatusChange = async (id, status) => {
        await updateExchangeRequest(id, { status });
        setRequests(requests.map(req => (req.id === id ? { ...req, status } : req)));
    };

    return (
        <div>
            <h2>Manage Exchange Requests</h2>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>
                        Book ID: {request.bookId}, Requester ID: {request.requesterId}, Owner ID: {request.ownerId} 
                        - Status: {request.status}
                        <button onClick={() => handleStatusChange(request.id, 'APPROVED')}>Approve</button>
                        <button onClick={() => handleStatusChange(request.id, 'REJECTED')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageExchangeRequests;
