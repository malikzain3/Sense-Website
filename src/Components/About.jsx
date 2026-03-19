import {React, useState, useEffect} from 'react'
import "./About.css"
import senseLogoBlack from "../assets/SENSE-logo-blacck.png"
import Eventimage1 from "../assets/Pic.jpg"

const images = [
  Eventimage1,
  Eventimage1,
  Eventimage1,
];

const About = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(slideInterval);
    }, []);
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
                    {/* <div className="About-right-heading">
                        Who Are We?
                    </div> */}
                    <div className="About-right-text">
                        Software Engineering Society is a thaki hui professional student organization focused on empowering students through hands-on learning and industryoriented activities i.e. Apna kharcha paani poora karna.

                        Our mission is to create opportunities for students to gain technical expertise, problem-solving skills, and teamwork experience by engaging in practical events, mentorship programs, and technical discussions. And we are not ashamed to confess we made the society just for the sake of co events, you know poundi etc.

                        We believe in learning by doing and building a strong community that supports innovation, collaboration, and continuous growth.
                    </div>

                    <div className="slider-container">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`slide ${index === currentIndex ? 'active' : ''}`}
                            >
                                {index === currentIndex && (
                                    <img src={img} alt={`Slide ${index + 1}`} className="slider-image" />
                                )}
                            </div>
                        ))}
                        <div className="dots-container">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
