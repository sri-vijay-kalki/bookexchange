import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default role is USER
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        if (username.trim() === '') {
            setUsernameError('Username cannot be empty');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const response = await loginUser(username, password, role);
        if (response.status === 401) {
            alert("Login failed");
            setPassword("");
            setUsername("");
        } else if (response.status === 400) {
            alert("Login failed! Bad Request: Check the minimum requirements for user attributes");
        } else if (response !== undefined && response.length !== "") {
            const data = await response.json();
            login(data.username, data.userId, data.token);
            alert('Login successful');
            if(role === "ADMIN") {
                navigate("/admin");
            }else{
                navigate("/search-books");
            }
        } else {
            alert('Login failed: Please enter credentials again');
            navigate("/login");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value.trim())}
                                        required
                                    />
                                    {usernameError && <div className="invalid-feedback">{usernameError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value.trim())}
                                        required
                                    />
                                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role:</label>
                                    <select
                                        id="role"
                                        className="form-select"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="USER">User</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
