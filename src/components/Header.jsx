import React from "react";

const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center text-center h-[80vh] bg-linear-to-r from-blue-100 to-blue-200">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700">
        Your Health, Simplified with Chronicare
      </h2>
      <p className="max-w-xl text-gray-600 mb-6">
        Manage your medications, track symptoms, and stay connected with your
        healthcare journey—all in one place.
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
        Get Started
      </button>
    </header>
  );
};

export default Header;
