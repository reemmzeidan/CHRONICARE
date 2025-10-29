import React from "react";
import PatientDashboard from "./PatientDashboard";
import DoctorDashboard from "./DoctorDashboard";
import CaregiverDashboard from "./CaregiverDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = ({ role }) => {
  switch (role) {
    case "patient":
      return <PatientDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "caregiver":
      return <CaregiverDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <div>Role not found</div>; // temporary fallback
  }
};

export default Dashboard;
