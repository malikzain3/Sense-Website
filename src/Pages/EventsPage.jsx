import React, { useState, useEffect, useRef } from "react";
import EventCard from "../Components/EventCard";
import eventsData from "../eventsData.js";
import "./EventsPage.css";

const CATEGORIES = ["All", "Workshop", "Seminar", "Hackathon", "Networking", "Competition"];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const prevCategory = useRef("All");

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    prevCategory.current = activeCategory;
    setActiveCategory(cat);
    setGridKey((k) => k + 1);
  };

  const allEvents = [...eventsData].reverse();
  const filteredEvents =
    activeCategory === "All"
      ? allEvents
      : allEvents.filter((e) => e.category === activeCategory);

  return (
    <div className={`events-container ${mounted ? "page-entered" : "page-entering"}`}>
      <h1 className="events-title">
        All <span>Events</span>
      </h1>

      <div className="events-filter-bar">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            style={{ "--i": i }}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <p className="no-events">No events found in this category.</p>
      ) : (
        <div key={gridKey} className="events-grid">
          {filteredEvents.map((item, i) => (
            <div
              key={item.id}
              className="card-wrapper flex justify-center"
              style={{ "--card-i": i }}
            >
              <EventCard {...item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;