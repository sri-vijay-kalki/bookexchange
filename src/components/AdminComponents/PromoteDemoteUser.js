import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole } from '../../api';

const PromoteDemoteUser = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getAllUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleRoleChange = async () => {
        await updateUserRole(selectedUserId, { role: newRole });
        setUsers(users.map(user => (user.id === selectedUserId ? { ...user, role: newRole } : user)));
    };

    return (
        <div>
            <h2>Promote/Demote User</h2>
            <label>Select User:</label>
            <select onChange={(e) => setSelectedUserId(e.target.value)}>
                <option value="">--Select User--</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username} - {user.role}</option>
                ))}
            </select>
            <label>New Role:</label>
            <select onChange={(e) => setNewRole(e.target.value)}>
                <option value="">--Select Role--</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button onClick={handleRoleChange}>Change Role</button>
        </div>
    );
};

export default PromoteDemoteUser;
