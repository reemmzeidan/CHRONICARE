import React, { useState } from "react";
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center">Chronicare</h1>
        <h2 className="mt-4 text-center text-xl font-medium text-gray-700">
          Create your account
        </h2>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role (e.g., Patient)"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 outline-none"
          />
          <input
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-700 focus:ring focus:ring-blue-200 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Sign Up
          </button>

          {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
