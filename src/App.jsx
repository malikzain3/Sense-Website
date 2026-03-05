import "./App.css";
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

function App() {
  return (
    <>
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
