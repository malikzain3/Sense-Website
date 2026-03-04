import React from 'react';
import EventCard from './EventCard';
import eventsData from '../eventsData.js'; // Path check kar lena bache
import "./Events.css";

const Events = () => {
  // Logic: Sab se naye events pehle, aur sirf 3 cards
  const homeEvents = [...eventsData].reverse().slice(0, 3);

  return (
    <div id='Events'>
      <div className="Events-Heading"> Events</div>
      
      <div className="Events-Content">
        {homeEvents.map((item) => (
          <EventCard 
            key={item.id} 
            {...item} // Isse saara data (title, date, month, etc.) khud chala jayega
          />
        ))}
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