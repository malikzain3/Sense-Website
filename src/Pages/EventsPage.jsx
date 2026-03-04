import React from "react";
import EventCard from "../Components/EventCard";
import eventsData from "../eventsData.js";
import "./EventsPage.css"; // CSS file import karo

const EventsPage = () => {
  const allEvents = [...eventsData].reverse();

  return (
    <div className="events-container">
      <h1 className="events-title">
        All <span>Events</span>
      </h1>

      <div className="events-grid">
        {allEvents.map((item) => (
          <div key={item.id} className="flex justify-center">
            <EventCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;