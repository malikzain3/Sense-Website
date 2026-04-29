import React, { useState, useEffect, useRef } from "react";
import EventCard from "../Components/EventCard";
import eventsData from "../eventsData.js";
import "./EventsPage.css";

const EventsPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const allEvents = [...eventsData].reverse();

  return (
    <div className={`events-container ${mounted ? "page-entered" : "page-entering"}`}>
      <h1 className="events-title">
        All <span>Events</span>
      </h1>

      {allEvents.length === 0 ? (
        <p className="no-events">No events found.</p>
      ) : (
        <div className="events-grid">
          {allEvents.map((item, i) => (
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