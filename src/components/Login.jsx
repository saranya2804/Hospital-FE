import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Import the new CSS file

const Login = () => {
    
    return (
        <div>
            <h1 style={{ margin: 0, padding: 0, color: 'white' }}>Login</h1>

            <div className="login-form-container"> {/* Updated class name */}
                <form className="login-form"> {/* Updated class name */}
                    <label className="login-label">Username</label> {/* Updated class name */}
                    <input className="login-input" type="text" placeholder="Enter Username" /> {/* Updated class name */}
                    <label className="login-label">Password</label> {/* Updated class name */}
                    <input className="login-input" type="password" placeholder="Enter Password" /> {/* Updated class name */}
                    <button className="login-button">Login</button> {/* Updated class name */}
                </form>
                <p style={{color:'white'}}>
                    New user? <Link to="/register">Go to Registration</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
