import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import Doctor from './components/Doctor.jsx' // Import the DoctorDashboard component
import Patient from './components/Patient.jsx'
const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/doctor" element={<Doctor/>} />
                <Route path="/patient" element={<Patient/>} />
                 {/* Add route for DoctorDashboard */}
            </Routes>
        </div>
    );
};

export default App;
