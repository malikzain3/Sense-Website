import {React, useState, useEffect} from 'react'
import "./About.css"
import senseLogo from "../assets/SENSE-LOGO@4x-8.png";
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
                    <img src={senseLogo} alt="logo" />
                    <div className="Quote">
                        " Where Future Software Engineers Are Built. Celebrate everyday with SENSE-IIUI "
                    </div>
                </div>
                <div className="About-right">
                    {/* <div className="About-right-heading">
                        Who Are We?
                    </div> */}
                    <div className="About-right-text">
                        <p>
                            The Software Engineering Society for Excellence (SENSE) at IIUI is a premier student organization dedicated to empowering the next generation of tech leaders. We bridge the gap between academic theory and industry practice through hands-on learning, workshops, and collaborative projects.
                        </p>
                        <p>
                            Our mission is to cultivate technical expertise, enhance problem-solving skills, and foster a spirit of teamwork. By organizing seminars, hackathons, and mentorship programs, we provide our members with the practical experience necessary to thrive in the fast-paced world of technology.
                        </p>
                        <p>
                            We are committed to building a vibrant and inclusive community where innovation flourishes. At SENSE, we believe in learning by doing, continuous growth, and supporting one another to shape a brighter digital future.
                        </p>
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
