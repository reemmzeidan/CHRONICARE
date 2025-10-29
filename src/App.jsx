import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import About from "./components/About.jsx";
import ChatRoom from "./components/ChatRoom.jsx"
// import Dashboard from "./components/Dashboard.jsx";
// import PatientDashboard from "./components/PatientDashboard";
// import DoctorDashboard from "./components/DoctorDashboard";
// import CaregiverDashboard from "./components/CaregiverDashboard";
// import AdminDashboard from "./components/AdminDashboard";
import React from "react";


function LayoutWrapper({ children }) {
  const location = useLocation();
  const noLayoutPages = ["/login", "/signup"];

  const hideLayout = noLayoutPages.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {children}
{<About/>}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="font-sans">
      <Router>
        <Navbar />
        <LayoutWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ChatRoom" element={<ChatRoom />} />
            
          </Routes>
        </LayoutWrapper>
      </Router>
    </div>
  );
}

export default App;
