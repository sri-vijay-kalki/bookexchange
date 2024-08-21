import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!username.trim()) {
            errors.username = 'Username cannot be empty';
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const resp = await register({ username, password, role });
            if (resp.status === 400) {
                alert("Bad Request: Check the minimum requirements for creating the user.");
            }else if(resp.status == 409){
                alert("user already exists! Try Logging in again.");
            } else if (resp.status === 200) {
                const data = await resp.json();
                alert("Successfully created user.");
                navigate("/login");
            } else {
                alert("Some error occurred.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value.trim());
                            setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                        }}
                        required
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value.trim());
                            setErrors(prevErrors => ({ ...prevErrors, password: '' }));
                        }}
                        required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                {/* The role selection is commented out; uncomment if needed */}
                {/* <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <select
                        id="role"
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div> */}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
