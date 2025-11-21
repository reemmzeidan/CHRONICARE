import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleDashboardClick = () => {
  if (role === "Doctor") navigate("/DoctorDashboard");
  else if (role === "Caregiver") navigate("/CaregiverDashboard");
  else if (role === "Patient") navigate("/PatientDashboard");
  else navigate("/Dashboard"); 
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">Chronicare</h1>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        {token && (
          <>
            <li>
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            </li>
            <li>
              <span
                onClick={handleDashboardClick}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                Dashboard
              </span>
            </li>
            <li>
              <Link to="/chatroom" className="hover:text-blue-600 transition">ChatRoom</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-blue-600 transition">Profile</Link>
            </li>
          </>
        )}
      </ul>

      <div className="flex space-x-3">
        {!token && (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
