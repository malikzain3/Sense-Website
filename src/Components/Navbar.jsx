import React from "react";
import "./Navbar.css";
import senseLogo from "../assets/SENSE-LOGO@4x-8.png";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);

  const isLoggedIn = !!localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
    window.location.href = "/"; 
  }, 500);
  };

  return (
    <div id="Navbar">
      <div className="Nav-left">
        <div className="LOGO">
          <img src={senseLogo} alt="Logo" />
        </div>
        <div className="Sense-Name">SENSE-IIUI</div>
      </div>

      <div className="Nav-mid">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/EventsPage">EVENTS</Link>
          </li>
          <li>
            <Link to="/GalleryPage">GALLERY</Link>
          </li>
          <li>CONTACT US</li>
          {/* Logged in user ke liye Dashboard link */}
          {isLoggedIn && (
            <li>
              <Link to="/Dashboard">DASHBOARD</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="Nav-right">
        {isLoggedIn ? (
          <div className="Admin-Controls">
            <div className="Profile-Icon" title="Admin Active">
              {/* FontAwesome icon agar install hai */}
              <i className="fa fa-user-circle"></i>
            </div>
            <button className="Logout-Btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="Join-us">
            <Link to="/LoginPage">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
