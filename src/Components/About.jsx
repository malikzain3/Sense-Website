import React from 'react'
import "./About.css"
import senseLogoBlack from "../assets/SENSE-logo-blacck.png"
import Eventimage1 from "../assets/AboutImage2.jpeg"
import Eventimage2 from "../assets/AboutImage1.jpeg"

const About = () => {
    return (
        <div id='About'>
            <div className="About-Heading">
                About Us
            </div>
            <div className="About-Content">
                <div className="About-left">
                    <img src={senseLogoBlack} alt="logo" />
                    <div className="Quote">
                        " Where Future Software Engineers Are Built. Celebrate everyday with SENSE-IIUI "
                    </div>
                </div>
                <div className="About-right">
                    <div className="About-right-heading">
                        Who Are We?
                    </div>
                    <div className="About-right-text">
                        Software Engineering Society is a thaki hui professional student organization focused on empowering students through hands-on learning and industryoriented activities i.e. Apna kharcha paani poora karna.

                        Our mission is to create opportunities for students to gain technical expertise, problem-solving skills, and teamwork experience by engaging in practical events, mentorship programs, and technical discussions. And we are not ashamed to confess we made the society just for the sake of co events, you know poundi etc.

                        We believe in learning by doing and building a strong community that supports innovation, collaboration, and continuous growth.                    
                    </div>
                    <div className="About-right-images">
                        <img src={Eventimage1} />
                        <img src={Eventimage2} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
