import React from "react";
import "./Dashboard.css";
import { FaUserMd, FaPills, FaChartLine, FaComments, FaUsersCog, FaClipboardList } from "react-icons/fa";

const Dashboard = ({ role = "patient" }) => {
  const roleData = {
    patient: [
      { icon: <FaUserMd />, title: "My Profile", desc: "View and update your health info" },
      { icon: <FaPills />, title: "Medications", desc: "Track doses and prescriptions" },
      { icon: <FaChartLine />, title: "Progress", desc: "Monitor your health journey" },
      { icon: <FaComments />, title: "Chat Room", desc: "Connect with doctors & caregivers" },
    ],
    doctor: [
      { icon: <FaClipboardList />, title: "Patient Records", desc: "Access patient medical history" },
      { icon: <FaChartLine />, title: "Reports", desc: "View and analyze performance" },
      { icon: <FaComments />, title: "Messages", desc: "Communicate with patients" },
      { icon: <FaUserMd />, title: "My Profile", desc: "Manage your doctor info" },
    ],
    caregiver: [
      { icon: <FaClipboardList />, title: "Assigned Patients", desc: "Monitor and assist your patients" },
      { icon: <FaPills />, title: "Tasks", desc: "Keep track of daily responsibilities" },
      { icon: <FaComments />, title: "Chat", desc: "Stay connected with the care team" },
      { icon: <FaUserMd />, title: "Profile", desc: "Update caregiver details" },
    ],
    admin: [
      { icon: <FaUsersCog />, title: "User Management", desc: "Add, edit or remove users" },
      { icon: <FaChartLine />, title: "Reports", desc: "View system analytics" },
      { icon: <FaComments />, title: "Support Chat", desc: "Assist users with issues" },
      { icon: <FaUserMd />, title: "Profile", desc: "Manage your admin profile" },
    ],
  };

  const cards = roleData[role] || [];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {role.charAt(0).toUpperCase() + role.slice(1)} 👋</h1>
        <p>Your personalized health management space</p>
      </div>

      <div className="dashboard-grid">
        {cards.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <div className="icon-wrapper">{card.icon}</div>
            <h2>{card.title}</h2>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

