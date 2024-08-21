import React, { useState, useEffect } from 'react';
import { getAllUsersWithPostCount } from '../../api';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const {token} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsersWithPostCount(token);
                if(response.status == 200) {
                    const data = await response.json();
                    setUsers(data);
                }else{
                    alert("error occured while fetching users");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">View Users</h2>
            {users.length === 0 ? (
                <div className="alert alert-info text-center">
                    <p className="mb-0">No users found.</p>
                </div>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Book Post Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userName}>
                                <td>{user.userName}</td>
                                <td>{user.bookPostCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewUsers;
