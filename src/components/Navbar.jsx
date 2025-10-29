import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">Chronicare</h1>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li className="hover:text-blue-600 cursor-pointer"><Link to="/" className="hover:text-blue-200 transition">Home</Link></li>
        <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-600 cursor-pointer">Features</li>
        <li className="hover:text-blue-600 cursor-pointer">ChatRoom</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>

      </ul>

      <div className="flex space-x-3">
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
      </div>
    </nav>
  );
};

export default Navbar;
