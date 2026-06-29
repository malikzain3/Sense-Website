import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { supabase } from "../supabase"; // Supabase import karein
import "./Events.css";

const Events = () => {
  const [homeEvents, setHomeEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeEvents = async () => {
      try {
        // Supabase se sirf top 3 latest events fetch karein
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        if (data) setHomeEvents(data);
      } catch (error) {
        console.error("Error fetching home events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeEvents();
  }, []);

  if (loading) return <div className="loading-text">Loading Events...</div>;

  return (
    <div id='Events'>
      <div className="Events-Heading">Events</div>
      
      <div className="Events-Content">
        {homeEvents.length === 0 ? (
          <p>No events to show.</p>
        ) : (
          [...homeEvents].sort((a, b) => {
            const dateA = new Date(`${a.month} ${a.date}, ${a.year}`).getTime() || 0;
            const dateB = new Date(`${b.month} ${b.date}, ${b.year}`).getTime() || 0;
            const isAUpcoming = a.status?.toLowerCase() === 'upcoming';
            const isBUpcoming = b.status?.toLowerCase() === 'upcoming';
            if (isAUpcoming && !isBUpcoming) return -1;
            if (!isAUpcoming && isBUpcoming) return 1;
            if (isAUpcoming) return dateA - dateB;
            return dateB - dateA;
          }).map((item) => (
            <EventCard 
              key={item.id} 
              {...item}
              image={item.image_url} // Props mapping zaroori hai
            />
          ))
        )}
      </div>

      <div className="All-Events-Button">
        <button onClick={() => window.location.href = '/EventsPage'}>
          SEE ALL EVENTS
        </button>
      </div>
    </div>
  );
};

export default Events;