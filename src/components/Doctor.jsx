import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [activeSection, setActiveSection] = useState("appointments");
    const [showSidebar, setShowSidebar] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState(""); // Track selected date
    const [selectedTime, setSelectedTime] = useState(""); // Track selected time
    const navigate = useNavigate();

    const doctorId = 1; // Replace this with the logged-in doctor's ID

    // Fetch appointments from the backend
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`/api/doctors/${doctorId}/appointments`);
                setAppointments(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setAppointments([]); // Fallback to an empty array
            }
        };
        fetchAppointments();
    }, [doctorId]);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    };

    const handleSectionClick = (section) => {
        setActiveSection(section);
        setShowSidebar(false);
    };

    const handleLogout = () => {
        navigate("/");
    };

    const acceptAppointment = async (appointmentId) => {
        try {
            const response = await axios.post(`/api/doctors/appointments/${appointmentId}/accept`);
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === appointmentId ? response.data : appointment
                )
            );
        } catch (error) {
            console.error("Error accepting appointment:", error);
        }
    };

    const writePrescription = async (appointmentId) => {
        const medicationDetails = prompt("Enter medication details:");
        const dosageInstructions = prompt("Enter dosage instructions:");

        if (medicationDetails && dosageInstructions) {
            try {
                const response = await axios.post(`/api/doctors/appointments/${appointmentId}/prescription`, null, {
                    params: { medicationDetails, dosageInstructions },
                });
                console.log("Prescription sent:", response.data);
            } catch (error) {
                console.error("Error writing prescription:", error);
            }
        }
    };

    const handleAddAvailableDate = () => {
        if (selectedDate && selectedTime) {
            setAvailableDates([...availableDates, { date: selectedDate, time: selectedTime }]);
            setSelectedDate("");
            setSelectedTime("");
        } else {
            alert("Please select both date and time.");
        }
    };

    const handleRemoveAvailableDate = (dateToRemove) => {
        setAvailableDates(availableDates.filter(({ date }) => date !== dateToRemove));
    };

    return (
        <div className="doctor-dashboard">
            <header className="navbar">
                <h1 style={{ fontSize: 24 }}>Welcome Doctor!</h1>
                <nav className="navbar-links">
                    <ul>
                        <li><a onClick={() => handleSectionClick("profile")}>Profile</a></li>
                        <li><a onClick={() => handleSectionClick("appointments")}>Appointments</a></li>
                        <li><a onClick={() => handleSectionClick("availability")}>Availability</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </nav>
            </header>

            <div className="content mt-5">
                {activeSection === "appointments" && (
                    <div className="appointments-box">
                        <h2>Upcoming Appointments</h2>
                        {Array.isArray(appointments) && appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <div key={appointment.id} className="appointment-item">
                                    <div>
                                        {appointment.patientName || "Unknown Patient"} - {appointment.time || "N/A"}
                                        <div>
                                            <button
                                                className="mark-completed-button"
                                                onClick={() => acceptAppointment(appointment.id)}
                                                disabled={appointment.status === "Accepted"}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="send-prescription-button"
                                                onClick={() => writePrescription(appointment.id)}
                                                disabled={appointment.status !== "Accepted"}
                                            >
                                                Write Prescription
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No appointments found.</p>
                        )}
                    </div>
                )}

                {activeSection === "availability" && (
                    <div className="available-dates-section">
                        <h2>Set Available Dates and Times</h2>
                        <div className="date-input-container">
                            <input
                                type="date"
                                className="date-input"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        {selectedDate && (
                            <div className="time-input-container">
                                <input
                                    type="time"
                                    className="time-input"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                />
                            </div>
                        )}
                        {selectedDate && selectedTime && (
                            <button onClick={handleAddAvailableDate}>Add Available Slot</button>
                        )}
                        <ul className="available-dates-list">
                            {availableDates.map(({ date, time }, index) => (
                                <li key={index} className="available-date-item">
                                    {date} - {time}
                                    <button
                                        className="remove-time-button"
                                        onClick={() => handleRemoveAvailableDate(date)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
