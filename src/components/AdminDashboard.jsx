import React from "react";
import "./Dashboards.css";
import { FaUsers, FaUserCheck, FaChartLine, FaBell } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">ChroniCare</h2>
        <ul className="sidebar-menu">
          <li className="active"><FaUsers /> Dashboard</li>
          <li><FaUserCheck /> Manage Users</li>
          <li><FaChartLine /> Analytics</li>
          <li><FaBell /> Alerts</li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="dashboard-header">
          <h1>Welcome back, Reem 💼</h1>
          <p>Here’s your admin overview</p>
        </div>

        <div className="stats-cards">
          <div className="card">
            <FaUsers className="card-icon" />
            <h3>50</h3>
            <p>Total Users</p>
          </div>
          <div className="card">
            <FaUserCheck className="card-icon" />
            <h3>30</h3>
            <p>Active Patients</p>
          </div>
          <div className="card">
            <FaChartLine className="card-icon" />
            <h3>80%</h3>
            <p>System Engagement</p>
          </div>
          <div className="card">
            <FaBell className="card-icon" />
            <h3>3</h3>
            <p>System Alerts</p>
          </div>
        </div>

        <div className="other-sections">
          <div className="section">Recent Signups</div>
          <div className="section">Analytics Charts</div>
          <div className="section">User Management</div>
          <div className="section">Announcements</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
