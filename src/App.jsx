import "./App.css";
import { useEffect } from "react";
import About from "./Components/About";
import Events from "./Components/Events";
import Gallery from "./Components/Gallery";
import HeroSection from "./Components/HeroSection";
import Team from "./Components/Team";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import EventsPage from "./Pages/EventsPage";
import Navbar from "./Components/Navbar";
import AboutPage from './Pages/AboutPage'
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Components/Dashboard";
import GalleryPage from "./Pages/GalleryPage";
import TeamPage from "./Pages/TeamPage";
import { Toaster } from 'react-hot-toast';
import Lenis from "lenis";
import ContactPage from "./Pages/ContactPage";
import NotFound from "./Pages/NotFound.jsx";
import TermsAndConditions from './Pages/TermsAndConditions'
import PrivacyPolicy from './Pages/PrivacyPolicy'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <About />
              <Events />
              <Gallery />
              <Team />
            </>
          }
        />

        <Route path="/EventsPage" element={<EventsPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/GalleryPage" element={<GalleryPage />} />
        <Route path="/TeamPage" element={<TeamPage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/Aboutpage" element={<AboutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
