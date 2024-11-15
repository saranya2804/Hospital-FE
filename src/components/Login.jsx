import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Ensure your CSS file exists and is correctly styled
import api from '../services/api';
const Login = () => {
    // State variables for form fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    // Login function
    const handleLogin = async (event) => {
        event.preventDefault();
    
        if (!role) {
            setError('Please select a role.');
            return;
        }
    
        try {
            const response = await api.post('/api/auth/login', {
                username,
                password,
            });
    
            console.log('Login successful:', response.data);
            alert('Login successful!');
            setUsername('');
            setPassword('');
            setRole('');
            setError('');
        } catch (error) {
            console.error('Login failed:', error);
            setError(
                error.response?.data?.message || 'Login failed. Please check your credentials.'
            );
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title" style={{ marginBottom: 0 }}>Login</h1>

            <div className="login-form-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <label className="login-label">Username</label>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label className="login-label">Password</label>
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <fieldset className="role-selection">
                        <legend>Select Role</legend>
                        <div>
                            <input
                                type="radio"
                                id="admin"
                                name="role"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="admin">Admin</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="doctor"
                                name="role"
                                value="doctor"
                                checked={role === 'doctor'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="doctor">Doctor</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="patient"
                                name="role"
                                value="patient"
                                checked={role === 'patient'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="patient">Patient</label>
                        </div>
                    </fieldset>

                    {error && <p className="error-message">{error}</p>}

                    <button
                        className="login-button"
                        type="submit"
                        disabled={!username || !password || !role}
                    >
                        Login
                    </button>
                </form>
                <p className="register-link">
                    New user? <Link to="/register">Go to Registration</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
