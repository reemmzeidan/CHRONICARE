import React from "react";
import "./Dashboards.css";
import { FaPills, FaCalendarCheck, FaHeart, FaUser } from "react-icons/fa";

const PatientDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">ChroniCare</h2>
        <ul className="sidebar-menu">
          <li className="active"><FaPills /> Dashboard</li>
          <li><FaUser /> Profile</li>
          <li><FaCalendarCheck /> Appointments</li>
          <li><FaHeart /> Chatroom</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Hello Reem 👋</h1>
          <p>Here’s your health summary today</p>
        </div>

        {/* Quick stats cards */}
        <div className="stats-cards">
          <div className="card">
            <FaPills className="card-icon" />
            <h3>3</h3>
            <p>Active Medications</p>
          </div>
          <div className="card">
            <FaCalendarCheck className="card-icon" />
            <h3>Next</h3>
            <p>Doctor Appointment</p>
          </div>
          <div className="card">
            <FaHeart className="card-icon" />
            <h3>85%</h3>
            <p>Health Score</p>
          </div>
        </div>

        {/* Placeholder sections */}
        <div className="other-sections">
          <div className="section">Medication Schedule</div>
          <div className="section">Health Charts / Graphs</div>
          <div className="section">Recent Alerts</div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;

