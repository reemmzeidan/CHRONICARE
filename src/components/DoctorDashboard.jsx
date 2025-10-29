import React from "react";
import "./Dashboards.css";
import { FaUserMd, FaCalendarCheck, FaEnvelope } from "react-icons/fa";

const DoctorDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">ChroniCare</h2>
        <ul className="sidebar-menu">
          <li className="active"><FaUserMd /> Dashboard</li>
          <li><FaCalendarCheck /> Appointments</li>
          <li><FaEnvelope /> Messages</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Welcome Dr. Reem 👨‍⚕️</h1>
          <p>Here’s your doctor summary today</p>
        </div>

        <div className="stats-cards">
          <div className="card">
            <FaUserMd className="card-icon" />
            <h3>12</h3>
            <p>Active Patients</p>
          </div>
          <div className="card">
            <FaCalendarCheck className="card-icon" />
            <h3>3</h3>
            <p>Upcoming Appointments</p>
          </div>
          <div className="card">
            <FaEnvelope className="card-icon" />
            <h3>5</h3>
            <p>New Messages</p>
          </div>
        </div>

        <div className="other-sections">
          <div className="section">Patients List</div>
          <div className="section">Appointments</div>
          <div className="section">Patient Health Charts</div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
