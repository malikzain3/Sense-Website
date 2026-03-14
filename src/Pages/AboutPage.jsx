import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AboutPage.css'

const stats = [
    { value: '500+', label: 'Active Members' },
    { value: '50+',  label: 'Events Held' },
    { value: '6',    label: 'Years Active' },
    { value: '20+',  label: 'Industry Partners' },
]

const AboutPage = () => {
    const navigate = useNavigate()
    const countersRef = useRef([])

    useEffect(() => {
        window.scrollTo(0, 0)

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in')
                }
            })
        }, { threshold: 0.15 })

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero-decoration">
                    <div className="hero-circle hc1"></div>
                    <div className="hero-circle hc2"></div>
                    <div className="hero-circle hc3"></div>
                </div>
                <div className="about-hero-content">
                    <span className="about-tag">SENSE IIUI</span>
                    <h1>
                        Where Engineers <br />
                        <span>Become Leaders</span>
                    </h1>
                    <p>
                        The Software Engineering Society for Excellence at the International
                        Islamic University Islamabad — empowering the next generation of
                        software engineers through knowledge, community, and innovation.
                    </p>
                    <div className="about-hero-btns">
                        <button className="btn-primary" onClick={() => navigate('/EventsPage')}>Explore Events</button>
                        <button className="btn-outline" onClick={() => navigate('/ContactPage')}>Get in Touch</button>
                    </div>
                </div>
                <div className="about-hero-visual">
                    <div className="hero-badge">
                        <div className="badge-inner">
                            <span className="badge-title">SENSE</span>
                            <span className="badge-sub">Est. 2018</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="about-stats">
                {stats.map((stat, i) => (
                    <div className="stat-card reveal" key={i}>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </section>

            {/* ── HISTORY ── */}
            <section className="about-section reveal">
                <div className="section-label">Our Story</div>
                <div className="about-history">
                    <div className="history-text">
                        <h2>The History of <span>SENSE</span></h2>
                        <p>
                            Founded in 2018 by a group of passionate software engineering students
                            at IIUI, SENSE was born out of a shared vision — to bridge the gap
                            between academic learning and the real world of technology.
                        </p>
                        <p>
                            What started as a small study group of a dozen students has grown
                            into one of the most active and recognized student societies at the
                            International Islamic University Islamabad, with hundreds of members
                            across all years of study.
                        </p>
                        <p>
                            Over the years, SENSE has organized workshops, hackathons, seminars,
                            and networking events — connecting students with industry professionals,
                            alumni, and fellow engineers from universities across Pakistan.
                        </p>
                    </div>
                    <div className="history-timeline">
                        {[
                            { year: '2018', event: 'SENSE founded at IIUI' },
                            { year: '2019', event: 'First inter-university hackathon' },
                            { year: '2020', event: 'Launched online workshops during COVID-19' },
                            { year: '2021', event: 'Reached 200+ active members' },
                            { year: '2023', event: 'Partnered with 20+ tech companies' },
                            { year: '2024', event: 'Launched the SENSE official website' },
                        ].map((item, i) => (
                            <div className="timeline-item" key={i}>
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-dot"></div>
                                <div className="timeline-event">{item.event}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VISION & MISSION ── */}
            <section className="about-vm reveal">
                <div className="vm-card vision-card">
                    <div className="vm-icon">👁</div>
                    <div className="section-label">Our Vision</div>
                    <h3>A Future Built by IIUI Engineers</h3>
                    <p>
                        To be the leading student society that nurtures technically excellent,
                        ethically grounded, and innovation-driven software engineers who
                        contribute meaningfully to Pakistan's digital future and the global
                        technology landscape.
                    </p>
                </div>
                <div className="vm-divider"></div>
                <div className="vm-card mission-card">
                    <div className="vm-icon">🎯</div>
                    <div className="section-label">Our Mission</div>
                    <h3>Empowering Students, One Event at a Time</h3>
                    <p>
                        To create an inclusive, high-impact community where software engineering
                        students at IIUI can develop their technical skills, expand their
                        professional network, and grow as leaders — through hands-on events,
                        industry collaboration, and a culture of continuous learning.
                    </p>
                </div>
            </section>

            {/* ── JOIN US CTA ── */}
            <section className="about-cta reveal">
                <div className="cta-decoration">
                    <div className="cta-circle cc1"></div>
                    <div className="cta-circle cc2"></div>
                </div>
                <div className="cta-content">
                    <span className="about-tag light">Join the Community</span>
                    <h2>Ready to Be Part of <span>SENSE?</span></h2>
                    <p>
                        Whether you're a first-year student or a final-year engineer, there's
                        a place for you in SENSE. Join us, attend our events, and become part
                        of a community that's shaping the future of software engineering at IIUI.
                    </p>
                    <div className="cta-btns">
                        <button className="btn-primary light" onClick={() => navigate('/EventsPage')}>
                            View Upcoming Events
                        </button>
                        <button className="btn-outline light" onClick={() => navigate('/ContactPage')}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default AboutPage