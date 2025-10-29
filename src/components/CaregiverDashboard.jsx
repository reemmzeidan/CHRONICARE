import React from "react";
import "./Dashboards.css";
import { FaUser, FaTasks, FaBell } from "react-icons/fa";

const CaregiverDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">ChroniCare</h2>
        <ul className="sidebar-menu">
          <li className="active"><FaUser /> Dashboard</li>
          <li><FaTasks /> Daily Tasks</li>
          <li><FaBell /> Alerts</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Hi [Name] 👋</h1>
          <p>Here’s your care summary today</p>
        </div>

        <div className="stats-cards">
          <div className="card">
            <FaUser className="card-icon" />
            <h3>2</h3>
            <p>Patients You Care For</p>
          </div>
          <div className="card">
            <FaTasks className="card-icon" />
            <h3>5</h3>
            <p>Tasks Completed</p>
          </div>
          <div className="card">
            <FaBell className="card-icon" />
            <h3>1</h3>
            <p>Alerts</p>
          </div>
        </div>

        <div className="other-sections">
          <div className="section">Daily Task Checklist</div>
          <div className="section">Patient Mood Tracker</div>
          <div className="section">Notes Section</div>
        </div>
      </main>
    </div>
  );
};

export default CaregiverDashboard;
