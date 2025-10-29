import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    age: "",
    gender: "",
    role: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", formData);
      setMessage(res.data.message);
      console.log("Token:", res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      {/* Left signup form */}
      <div className="signup-left">
        <div className="signup-card">
          <h1 className="signup-title">Chronicare</h1>
          <h2 className="signup-subtitle">Create your account</h2>

          <form onSubmit={handleSignup} className="signup-form">

            {/* First Name & Last Name */}
            <div className="flex gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="signup-input flex-1"
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="signup-input flex-1"
              />
            </div>

            {/* Username */}
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="signup-input"
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="signup-input"
                        />

                        {/* Age & Gender */}
            <div className="flex gap-4">
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
                className="signup-input flex-1"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="signup-input flex-1"
              >
                <option value="" disabled selected hidden>Choose Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Role */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="signup-input"
            >
              <option value="" disabled selected hidden>Choose Role</option>
              <option value="Admin">Admin</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Caregiver">Caregiver</option>
            </select>


            {/* Phone */}
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="signup-input"
            />

            {/* Password */}
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="signup-input"
            />

            {/* Confirm Password */}
            <input
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="signup-input"
            />

            {/* Submit */}
            <button type="submit" className="signup-button">Sign Up</button>
            {message && <p className="signup-message">{message}</p>}
          </form>

          <p className="signup-text">
            Already have an account?{" "}
      
            <a href="/login">Log In</a>
          </p>
        </div>
      </div>

      {/* Right welcome panel */}
      <div className="signup-right">
        <h1>Welcome to the Chronicare Family</h1>
        <p>
          Join thousands of patients and caregivers improving their healthcare journey with Chronicare. 
          Manage medications, track symptoms, and stay connected—all in one place.
        </p>
      </div>
    </div>
  );
};

export default Signup;
