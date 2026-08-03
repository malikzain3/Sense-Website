import { React, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./About.css";
import senseLogo from "../assets/SENSE-LOGO@4x-8.png";
import Eventimage1 from "../assets/Pic.jpg";

const images = [Eventimage1, Eventimage1, Eventimage1];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const logoRef = useRef(null);
  const quoteRef = useRef(null);
  const textRef = useRef(null);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  // Image slider effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  // ========== GSAP ANIMATIONS ==========
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      
      // 1. LOGO - Clean fade and scale
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          {
            scale: 0.6,
            opacity: 0,
            rotation: -15,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            ease: "back.out(1.7)",
          }
        );

        // 2. LOGO - Gentle floating
        gsap.to(logoRef.current, {
          y: -8,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      // 3. QUOTE - Fade in with slide
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
      }

      // 4. SLIDER - Scale and fade on entry
      if (sliderRef.current) {
        gsap.fromTo(
          sliderRef.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
          }
        );
      }

    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="About" ref={sectionRef}>
      <div className="About-Heading">About Us</div>

      <div className="About-Content">
        <div className="About-left">
          <div ref={logoRef} className="about-logo-wrapper">
            <img src={senseLogo} alt="logo" className="about-logo" />
          </div>

          <div ref={quoteRef} className="Quote">
            " Where Future Software Engineers Are Built. Celebrate everyday with
            SENSE-IIUI "
          </div>
        </div>

        <div className="About-right">
          <div className="About-right-text" ref={textRef}>
            <p>
              The Software Engineering Society for Excellence (SENSE) at IIUI is
              a premier student organization dedicated to empowering the next
              generation of tech leaders. We bridge the gap between academic
              theory and industry practice through hands-on learning, workshops,
              and collaborative projects.
            </p>
            <p>
              Our mission is to cultivate technical expertise, enhance
              problem-solving skills, and foster a spirit of teamwork. By
              organizing seminars, hackathons, and mentorship programs, we
              provide our members with the practical experience necessary to
              thrive in the fast-paced world of technology.
            </p>
          </div>

          <div ref={sliderRef} className="slider-container-3d">
            <div className="slider-container">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentIndex ? "active" : ""}`}
                >
                  {index === currentIndex && (
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="slider-image"
                    />
                  )}
                </div>
              ))}
              <div className="dots-container">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentIndex ? "active-dot" : ""}`}
                    onClick={() => setCurrentIndex(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;