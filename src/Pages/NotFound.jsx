import React, { useState } from 'react'; // useState add kiya
import { useNavigate } from 'react-router-dom';
import senseLogo from "../assets/SENSE-LOGO@4x-8.png";

const NotFound = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false); // Hover state

  const containerStyle = {
    backgroundColor: '#ffffff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
    textAlign: 'center',
    padding: '20px'
  };

  const numberStyle = {
    fontSize: 'clamp(120px, 20vw, 220px)', // Responsive size (Mobile pe chota, Desktop pe bara)
    fontWeight: '900',
    color: '#93e8eb',
    lineHeight: '1',
    letterSpacing: '-8px'
  };

  const buttonStyle = {
    padding: '14px 45px',
    backgroundColor: isHovered ? '#000' : '#333', // Subtle color change
    color: '#fff',
    border: 'none',
    borderRadius: '50px', // Full rounded (More professional)
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Springy professional transition
    transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)', // Lift up effect
    boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.15)' : '0 4px 6px rgba(0,0,0,0.05)',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '30px' }}>
        <span style={numberStyle}>4</span>
        
        <div style={{ width: 'clamp(100px, 15vw, 180px)' }}>
          <img 
            src={senseLogo} 
            alt="Sense Logo" 
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
          />
        </div>

        <span style={numberStyle}>4</span>
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '10px' }}>
        Lost your Sense?
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '40px', maxWidth: '400px' }}>
        The page you're looking for doesn't exist.
      </p>

      <button 
        onClick={() => navigate('/')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={buttonStyle}
      >
        Back to Reality
      </button>
    </div>
  );
};

export default NotFound;