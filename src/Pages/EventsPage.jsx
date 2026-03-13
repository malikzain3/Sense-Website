import React, { useState } from "react";
import EventCard from "../Components/EventCard";
import eventsData from "../eventsData.js";
import "./EventsPage.css";

const CATEGORIES = ["All", "Workshop", "Seminar", "Hackathon", "Networking", "Competition"];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const allEvents = [...eventsData].reverse();

  const filteredEvents =
    activeCategory === "All"
      ? allEvents
      : allEvents.filter((e) => e.category === activeCategory);

  return (
    <div className="events-container">
      <h1 className="events-title">
        All <span>Events</span>
      </h1>

      <div className="events-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <p className="no-events">No events found in this category.</p>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((item) => (
            <div key={item.id} className="flex justify-center">
              <EventCard {...item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;