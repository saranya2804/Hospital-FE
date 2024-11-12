import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import './PatientDashboard.css';

const Patient = () => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState('book'); 
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]); // State to hold doctors list

  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/'); // Navigate to the home page on logout
  };

  // Fetch doctors list from API
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctors'); // Replace with your actual API endpoint
        console.log('Doctors response:', response.data); // Log response to check the data
        setDoctors(Array.isArray(response.data) ? response.data : []); // Set doctors if it's an array
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]); // Set empty array in case of error
      }
    };

    fetchDoctors(); // Fetch doctors when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  const doctorAvailability = {
    Smith: ['09:00 AM', '10:00 AM', '11:00 AM'],
    Johnson: ['02:00 PM', '03:00 PM', '04:00 PM'],
    Williams: ['08:00 AM', '09:30 AM', '10:30 AM'],
  };

  const handleDoctorChange = (e) => {
    setDoctor(e.target.value);
    setTime(''); // Reset time when doctor is changed
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAppointment = { doctor, date, time };
    setAppointments([...appointments, newAppointment]); // Add new appointment
    alert(`Appointment booked with Dr. ${doctor} on ${date} at ${time}`);
    setDoctor(''); // Reset form after booking
    setDate('');
    setTime('');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showAppointments = () => {
    setView('appointments');
    setIsMenuOpen(false);
  };

  const showBookingForm = () => {
    setView('book');
  };

  return (
    <div className="patient-container">
      <header className="navbar">
        <h1 style={{ fontSize: 24 }}>Welcome John!</h1>
        
        <nav className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#appointments" onClick={showAppointments}>Appointments</a></li>
            <li><a href="#medications">Medications</a></li>
            <li><a href="#logout" onClick={handleLogout}>Logout</a></li>
          </ul>
        </nav>
      </header>

      <div className="dashboard-layout">
        <div className="content">
          {view === 'book' ? (
            <div className="appointment-box">
              <h2>Book an Appointment</h2>
              <form onSubmit={handleFormSubmit} className="appointment-form">
                <div className="form-group">
                  <label htmlFor="doctor" style={{ color: 'black' }}>Select Doctor</label>
                  <select
                    id="doctor"
                    value={doctor}
                    onChange={handleDoctorChange}
                    required
                  >
                    <option value="">Select Doctor</option>
                    {Array.isArray(doctors) && doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        Dr. {doc.name} {/* Assuming each doctor has an 'id' and 'name' */}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date" style={{ color: 'black' }}>Select Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time" style={{ color: 'black' }}>Select Time</label>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    disabled={!doctor}
                  >
                    <option value="">Select Time</option>
                    {doctor && doctorAvailability[doctor]?.map((availableTime, index) => (
                      <option key={index} value={availableTime}>{availableTime}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="submit-btn">Book Appointment</button>
              </form>
            </div>
          ) : (
            <>
              <h2>Your Appointments</h2>
              {appointments.length > 0 ? (
                <ul>
                  {appointments.map((appointment, index) => (
                    <li key={index}>
                      {`Dr. ${appointment.doctor} - ${appointment.date} at ${appointment.time}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No appointments booked yet.</p>
              )}
              <button onClick={showBookingForm} className="submit-btn" style={{ marginTop: '10px' }}>
                Book Another Appointment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patient;
