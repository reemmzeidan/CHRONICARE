import React from "react";
import DoctorDashboard from "./Dashboard/DoctorDashboard";
import PatientDashboard from "./Dashboard/PatientDashboard";
import CaregiverDashboard from "./Dashboard/CaregiverDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";

function Dashboard() {
  
  const role = localStorage.getItem("role");

  switch (role) {
    case "Doctor":
      return <DoctorDashboard />;
    case "Patient":
      return <PatientDashboard />;
    case "Caregiver":
      return <CaregiverDashboard />;
    case "Admin":
      return <AdminDashboard />;
    default:
      return (
        <div className="p-6 text-gray-700">
          <h2 className="text-xl font-semibold mb-2">No valid dashboard found.</h2>
          <p>Please sign in again.</p>
        </div>
      );
  }
}

export default Dashboard;

