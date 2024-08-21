import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../api';

const DeleteUser = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async () => {
        await deleteUser(selectedUserId);
        setUsers(users.filter(user => user.id !== selectedUserId));
    };

    return (
        <div>
            <h2>Delete User</h2>
            <label>Select User:</label>
            <select onChange={(e) => setSelectedUserId(e.target.value)}>
                <option value="">--Select User--</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username} - {user.role}</option>
                ))}
            </select>
            <button onClick={handleDelete}>Delete User</button>
        </div>
    );
};

export default DeleteUser;
