import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [caregiversCount, setCaregiversCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/dashboard/counts");
        setPatientsCount(res.data.patients);
        setDoctorsCount(res.data.doctors);
        setCaregiversCount(res.data.caregivers);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card patients-card">
          <h2>Patients</h2>
          <p className="count">{patientsCount}</p>
          <Link to="/patients" className="dashboard-link">Manage Patients</Link>
        </div>

        <div className="dashboard-card doctors-card">
          <h2>Doctors</h2>
          <p className="count">{doctorsCount}</p>
          <Link to="/doctors" className="dashboard-link">Manage Doctors</Link>
        </div>

        <div className="dashboard-card caregivers-card">
          <h2>Caregivers</h2>
          <p className="count">{caregiversCount}</p>
          <Link to="/caregivers" className="dashboard-link">Manage Caregivers</Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
