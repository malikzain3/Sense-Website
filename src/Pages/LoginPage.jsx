import React, { useEffect } from 'react';
import './LoginPage.css';
import senseLogoBlack from "../assets/SENSE-logo-blacck.png"

const LoginPage = () => {
  useEffect(() => {
    // Agar tilt library load ho jaye to animation trigger karega
    if (window.$ && window.$.fn && window.$.fn.tilt) {
      window.$('.js-tilt').tilt({ scale: 1.1 });
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Left Side: Logo Area */}
        <div className="login-image-section js-tilt">
          <img src={senseLogoBlack} alt="SENSE Logo" />
        </div>

        {/* Right Side: Form Area */}
        <form className="login-form">
          <h2 className="login-title">Member Login</h2>

          <div className="input-group">
            <span className="input-icon"><i className="fa fa-envelope"></i></span>
            <input type="email" placeholder="Email" />
          </div>

          <div className="input-group">
            <span className="input-icon"><i className="fa fa-lock"></i></span>
            <input type="password" placeholder="Password" />
          </div>

          <button type="button" className="login-btn">LOGIN</button>

          {/* New Team Specific Footer */}
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