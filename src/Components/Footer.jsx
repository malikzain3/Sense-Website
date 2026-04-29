import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import senseLogo from "../assets/SENSE-LOGO@4x-8.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const bgRef = useRef(null);
  const location = useLocation();

  useGSAP(
    () => {
      const bg = bgRef.current;
      if (!bg) return;

      const tween = gsap.fromTo(
        bg,
        { y: 150, scaleY: 1.3 },
        {
          y: 0,
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [location.pathname] }
  );

  React.useEffect(() => {
    const refresh = () => ScrollTrigger.refresh(true);
    requestAnimationFrame(() => requestAnimationFrame(refresh));
    const t1 = setTimeout(refresh, 50);
    const t2 = setTimeout(refresh, 250);
    window.addEventListener("load", refresh, { once: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", refresh);
    };
  }, [location.pathname]);

  return (
    <div className="footer-wrapper">
      <div id="Footer" ref={footerRef}>
        {/* animated background only */}
        <div className="footer-bg" ref={bgRef} aria-hidden="true" />

        {/* real footer content (not scaled) */}
        <div className="footer-content">
          <div className="Footer-Top">
            <div className="Footer-Left">
              <div className="Footer-Sense-Name">
                Software Engineering Society For Excellence - IIUI
              </div>
              <div className="gmail">
                sense.iiui.dse@gmail.com
              </div>
              <div className="media-links">
                <a href="https://wa.me/+923125861129" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="media-icon"/>
                </a>
                <a href="https://www.instagram.com/sense.iiui?igsh=MXF3azY5dmJ3dGZidw==" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="media-icon" />
                </a>
                <a href="https://www.linkedin.com/company/sense-iiui/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="media-icon" />
                </a>
              </div>
            </div>

            <div className="Footer-Mid">
              <div className="Footer-Sense-logo">
                <img
                  src={senseLogo}
                  alt="Logo"
                  width={150}
                  height={150}
                  onLoad={() => ScrollTrigger.refresh(true)}
                />
              </div>
            </div>

            <div className="Footer-Right">
              <div className="Footer-About-Us">
                <div className="Footer-About-Us-Heading">About Us</div>
                <div className="Footer-About-Us-links links">
                  <Link to="/AboutPage#history" onClick={() => setIsMenuOpen(false)}>History</Link>
                  <Link to="/AboutPage#vision" onClick={() => setIsMenuOpen(false)}>Our Vision</Link>
                  <Link to="/AboutPage#mission" onClick={() => setIsMenuOpen(false)}>Our Mission</Link>
                </div>
              </div>

              <div className="Footer-Explore">
                <div className="Footer-Explore-Heading">Explore</div>
                <div className="Footer-Explore-links links">
                  <Link to="/EventsPage" onClick={() => setIsMenuOpen(false)}>Events</Link>
                  <Link to="/TeamPage" onClick={() => setIsMenuOpen(false)}>Team</Link>
                  <Link to="/GalleryPage" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                </div>
              </div>

              <div className="Footer-Support">
                <div className="Footer-Support-Heading">Support</div>
                <div className="Footer-Support-links links">
                  <a href="">Collaboration</a>
                  <a href="">Membership</a>
                  <a href="/ContactPage">Contact Us</a>
                </div>
              </div>
            </div>
          </div>

          <div className="line"></div>
          <div className="Footer-Bottom">
            <div className="Footer-Bottom-left">
              <div className="legal-pages links">
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>
            <div className="Footer-Bottom-mid">
              &copy; 2024 Software Engineering Society For Excellence - IIUI. All rights reserved.
            </div>
            <div className="Footer-Bottom-right">
              Developed by SENSE Web Team
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
