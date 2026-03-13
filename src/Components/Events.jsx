import React from 'react';
import EventCard from './EventCard';
import eventsData from '../eventsData.js'; 
import "./Events.css";

const Events = () => {
  
  const homeEvents = [...eventsData].reverse().slice(0, 3);

  return (
    <div id='Events'>
      <div className="Events-Heading"> Events</div>
      
      <div className="Events-Content">
        {homeEvents.map((item) => (
          <EventCard 
            key={item.id} 
            {...item} 
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