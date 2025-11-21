import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for token changes (login/logout in other tabs)
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className="header bg-header">
      <h1>Your Health, Simplified with Chronicare</h1>
      <p>
        Manage your medications, track symptoms, and stay connected with your
        healthcare journey—all in one place.
      </p>

      {!isLoggedIn && (
        <Link to="/signup">
          <button className="btn-get-started">Get Started</button>
        </Link>
      )}
    </header>
  );
};

export default Header;
