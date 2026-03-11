import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  // Added a state to show a loading message on the button
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "ab036f3a-bd51-43f8-8144-a5539b604096", 
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "SENSE Society Website", 
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thanks for reaching out! A SENSE team member will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" }); 
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="contact-page">
      <div className="heading-container">
        <h1 className="page-title">
          CONTACT <span className="title-highlight">US</span>
        </h1>
        <p className="contact-subtitle">
          Have questions, want to join, or looking to collaborate? Reach out to the SENSE Society team!
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <h3>Get in Touch</h3>
          
          <div className="info-item">
            <span className="info-icon"><FaPhoneAlt /></span>
            <div>
              <strong>Phone:</strong>
              <p>+92 300 0000000 <br /><span className="info-subtext">(Society Representative)</span></p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon"><FaEnvelope /></span>
            <div>
              <strong>Email:</strong>
              <p>sense.society@iiu.edu.pk</p>
            </div>
          </div>

          <div className="social-media-section">
            <strong>Connect With Us:</strong>
            <div className="social-links-vertical">
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram className="social-icon" /> Instagram
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin className="social-icon" /> LinkedIn
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook className="social-icon" /> Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@iiu.edu.pk"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="E.g., Event Sponsorship, Membership Query"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows="5"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;