import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import About from "./components/About.jsx";
import ChatRoom from "./components/ChatRoom.jsx";
import Profile from "./components/Profile.jsx";
import PatientDashboard from "./components/PatientDashboard.jsx";
import DoctorDashboard from "./components/DoctorDashboard.jsx";
import CaregiverDashboard from "./components/CaregiverDashboard.jsx";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const noLayoutPages = ["/login", "/signup"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <About />}
      {!hideLayout && <Footer />}
    </>
  );
}

function RequireRole({ role, children }) {
  const userRole = localStorage.getItem("role");
  if (userRole !== role) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <LayoutWrapper>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/profile" element={<Profile />} />

          
          <Route
            path="/PatientDashboard"
            element={
              <RequireRole role="Patient">
                <PatientDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/DoctorDashboard"
            element={
              <RequireRole role="Doctor">
                <DoctorDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/CaregiverDashboard"
            element={
              <RequireRole role="Caregiver">
                <CaregiverDashboard />
              </RequireRole>
            }
          />

          
          <Route
            path="/Dashboard"
            element={<NavigateToRoleDashboard />}
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}


function NavigateToRoleDashboard() {
  const role = localStorage.getItem("role");
  if (role === "patient") return <Navigate to="/patient-dashboard" replace />;
  if (role === "doctor") return <Navigate to="/doctor-dashboard" replace />;
  if (role === "caregiver") return <Navigate to="/caregiver-dashboard" replace />;
  return <Navigate to="/login" replace />;
}

export default App;
