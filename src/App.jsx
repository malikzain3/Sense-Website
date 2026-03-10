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
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Components/Dashboard";
import GalleryPage from "./Pages/GalleryPage";
import TeamPage from "./Pages/TeamPage";
import { Toaster } from 'react-hot-toast';
import Lenis from "lenis";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
