import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
    const [role, setRole] = useState('');
    const [specialization, setSpecialization] = useState('');

    return (
        <div>
            <h1 style={{marginBottom:"10px"}}>Registration</h1>
            <div className="form-container" style={{ height: 'auto', margin: 0, padding: 0 }}>
                <form>
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" /><br />
                    
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" /><br />
                    
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" /><br />
                    
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" /><br />
                    
                    <label>Phone Number</label>
                    <input type="number" placeholder="Enter Phone Number" /><br />

                    <fieldset className="role-container">
                        <legend style={{ color: 'white' }}>Role</legend>
                        <label>
                            <input
                                type="radio"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={() => setRole('admin')}
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="doctor"
                                checked={role === 'doctor'}
                                onChange={() => setRole('doctor')}
                            />
                            Doctor
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="hospital"
                                checked={role === 'hospital'}
                                onChange={() => setRole('hospital')}
                            />
                            Patient
                        </label>
                    </fieldset>
                    
                    {role === 'doctor' && (
                        <div style={{ height: 'auto', margin: 0, padding: 0 }}>
                            <label>Specialization
                            <input
                                type="text"
                                placeholder="Enter Specialization"
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                            /></label>
                        </div>
                    )}
                    
                    <button>Register</button>
                </form>
                <p style={{ color: 'white' }}>
                    Already an existing user? <Link to="/login">Go back to Login page</Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
