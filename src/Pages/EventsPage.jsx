import React, { useState, useEffect } from "react";
import EventCard from "../Components/EventCard";
import "./EventsPage.css";
import { supabase } from "../supabase";

const EventsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (data) setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className={`events-container ${mounted ? "page-entered" : "page-entering"}`}>
      <h1 className="events-title">All <span>Events</span></h1>
      {events.length === 0 ? (
        <p className="no-events">No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((item, i) => (
            <div key={item.id} className="card-wrapper flex justify-center" style={{ "--card-i": i }}>
              <EventCard
                {...item}
                image={item.image_url} // Ye line add karen: image_url ko 'image' prop mein convert karne ke liye
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;