import React from 'react'
import senseLogo from "../assets/SENSE-LOGO@4x-8.png"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./Footer.css"

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {

    useGSAP(() => {
        gsap.from("#Footer", {
            y: 150,
            scaleY: 1.3,
            scrollTrigger: {
                trigger: "#Footer",
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        })
    }, [])

    return (
        <div className="footer-wrapper">
            <div id='Footer'>
                <div className="Footer-Top">
                    <div className="Footer-Left">
                        <div className="Footer-Sense-Name">
                            Software Engineering Society For Excellence - IIUI
                        </div>
                    </div>
                    <div className="Footer-Mid">
                        <div className="Footer-Sense-logo">
                            <img src={senseLogo} alt="Logo" />
                        </div>
                    </div>
                    <div className="Footer-Right">
                        <div className="Footer-About-Us">
                            <div className="Footer-About-Us-Heading">
                                About Us
                            </div>
                            <div className="Footer-About-Us-links links">
                                <a href="">History</a>
                                <a href="">Our Vision</a>
                                <a href="">Our Mission</a>
                            </div>
                        </div>
                        <div className="Footer-Explore">
                            <div className="Footer-Explore-Heading">
                                Explore
                            </div>
                            <div className="Footer-Explore-links links">
                                <a href="">Events</a>
                                <a href="">Team</a>
                                <a href="">Gallery</a>
                            </div>
                        </div>
                        <div className="Footer-Support">
                            <div className="Footer-Support-Heading">
                                Support
                            </div>
                            <div className="Footer-Support-links links">
                                <a href="">Collaboration</a>
                                <a href="">Volubteer</a>
                                <a href="">Membership</a>
                            </div>
                        </div>
                        <div className="Footer-Media">
                            <div className="Footer-Media-Heading">
                                Social Media
                            </div>
                            <div className="Footer-Support-links links">
                                <a href="">Linkedin</a>
                                <a href="">Instagram</a>
                                <a href="">Facebook</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="line"></div>
                <div className="Footer-Bottom">
                    All Rights Reserved
                </div>
            </div>
        </div>
    )
}

export default Footer
