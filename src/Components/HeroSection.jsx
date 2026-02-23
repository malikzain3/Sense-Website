import NeuralBackground from "./NeuralBackground";
import "./HeroSection.css";
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="hero-section">
        <Navbar />
      <NeuralBackground />
      <div className="hero-content">
        <h1 className="hero-title">SOFTWARE ENGINEERING SOCIETY FOR EXCELLENCE - IIUI</h1>
        <p className="hero-subtitle">
          Where Innovations Meet Integrity
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
