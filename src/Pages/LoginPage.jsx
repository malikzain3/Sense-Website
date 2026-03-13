import React, { useEffect, useState } from "react"; 

import "./LoginPage.css";
import senseLogoBlack from "../assets/SENSE-logo-blacck.png";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    // Tilt animation logic
    if (window.$ && window.$.fn && window.$.fn.tilt) {
      window.$(".js-tilt").tilt({ scale: 1.1 });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Ahmed yahan API url laga do login ke liye, aur email/password bhejo
    console.log("Login Attempt:", { email, password });

    try {
      const dummyToken = "SENSE_ADMIN_TOKEN_123";

      localStorage.setItem("adminToken", dummyToken);
      toast.success("Welcome Back, Admin! 👋");
      setTimeout(() => {
        window.location.href = "/Dashboard";
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Login fail ho gaya!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Side: Logo Area */}
        <div className="login-image-section js-tilt">
          <img src={senseLogoBlack} alt="SENSE Logo" />
        </div>

        {/* Right Side: Form Area */}
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Member Login</h2>

          <div className="input-group">
            <span className="input-icon">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            LOGIN
          </button>

          <div className="login-footer">
            <p className="restricted-text">Authorized Team Access Only</p>
            <span className="contact-text">Contact Admin for login issues</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
