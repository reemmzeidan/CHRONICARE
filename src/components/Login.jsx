import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      setMessage(res.data.message);

     
      localStorage.setItem("token", res.data.token);

      
      const user = res.data.user; 
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role); 

      
      if (user.role === "Doctor") navigate("/DoctorDashboard");
      else if (user.role === "Caregiver") navigate("/CaregiverDashboard");
      else if (user.role === "Patient") navigate("/PatientDashboard");
      else navigate("/Dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Welcome Back!</h1>
        <p>
          Manage your health easily with Chronicare. Track medications, monitor progress,
          and stay connected with your caregivers and doctors.
        </p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h1 className="login-title">Chronicare</h1>
          <h2 className="login-subtitle">Log in to your account</h2>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Log In
            </button>

            {message && <p className="login-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
