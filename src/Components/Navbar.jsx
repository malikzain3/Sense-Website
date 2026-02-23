import React from 'react'
import "./Navbar.css"
import senseLogo from "../assets/SENSE-LOGO@4x-8.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id='Navbar'>
        <div className="Nav-left">
            <div className="LOGO">
                <img src={senseLogo} alt="Logo" />
            </div>
            <div className="Sense-Name">
                SENSE-IIUI
            </div>
        </div>
        <div className="Nav-mid">
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/EventsPage">EVENTS</Link></li>
                <li>GALLERY</li>
                <li>CONTACT US</li>
            </ul>
        </div>
        <div className="Nav-right">
            <div className="Join-us">
                JOIN US
            </div>
        </div>
    </div>
  )
}

export default Navbar
