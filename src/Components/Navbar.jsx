import React, { useState } from "react";
import "./Navbar.css";
import senseLogo from "../assets/SENSE-LOGO@4x-8.png";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("adminToken");

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!");
    setTimeout(() => { window.location.href = "/"; }, 500);
  };

  return (
    <nav id="Navbar" className={isMenuOpen ? "open" : ""}>
      <div className="Nav-left">
        <div className="LOGO">
          <img src={senseLogo} alt="Logo" />
        </div>
        <div className="Sense-Name">SENSE-IIUI</div>
      </div>

      <div className="Hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`Nav-wrapper ${isMenuOpen ? "active" : ""}`}>
        <ul className="Nav-links">
          <li><Link to="/" className={`nav-link ${isActive("/")}`} onClick={() => setIsMenuOpen(false)}>HOME</Link></li>
          <li><Link to="/AboutPage" className={`nav-link ${isActive("/AboutPage")}`} onClick={() => setIsMenuOpen(false)}>ABOUT US</Link></li>
          <li><Link to="/EventsPage" className={`nav-link ${isActive("/EventsPage")}`} onClick={() => setIsMenuOpen(false)}>EVENTS</Link></li>
          <li><Link to="/GalleryPage" className={`nav-link ${isActive("/GalleryPage")}`} onClick={() => setIsMenuOpen(false)}>GALLERY</Link></li>
          <li><Link to="/ContactPage" className={`nav-link ${isActive("/ContactPage")}`} onClick={() => setIsMenuOpen(false)}>CONTACT US</Link></li>
          {isLoggedIn && <li><Link to="/Dashboard" className={`nav-link ${isActive("/Dashboard")}`} onClick={() => setIsMenuOpen(false)}>DASHBOARD</Link></li>}
        </ul>

        <div className="Nav-right">
          {isLoggedIn ? (
            <button className="Logout-Btn" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className="Join-us" to="/ContactPage" onClick={() => setIsMenuOpen(false)}>Join Us</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;