import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import senseLogo from "../assets/SENSE-LOGO@4x-8.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom'
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
                  <a href="">History</a>
                  <a href="">Our Vision</a>
                  <a href="">Our Mission</a>
                </div>
              </div>

              <div className="Footer-Explore">
                <div className="Footer-Explore-Heading">Explore</div>
                <div className="Footer-Explore-links links">
                  <a href="">Events</a>
                  <a href="">Team</a>
                  <a href="">Gallery</a>
                </div>
              </div>

              <div className="Footer-Support">
                <div className="Footer-Support-Heading">Support</div>
                <div className="Footer-Support-links links">
                  <a href="">Collaboration</a>
                  <a href="">Volubteer</a>
                  <a href="">Membership</a>
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
