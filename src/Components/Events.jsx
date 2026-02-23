import React from 'react'
import "./Events.css"
import EventCard from './EventCard'
import event1 from "../assets/event1.jpg"

const Events = () => {
  return (
    <div id='Events'>
      <div className="Events-Heading">
        Events
      </div>
      <div className="Events-Content">
        <EventCard
          image={event1} 
          title="Cultural Exchange Night" 
          desc="Celebrate the beauty of diversity..."
          date="28"
          month=" Sep"
          year=" 2026"
          time="6:00 PM - 9:00 PM"
          venue="Conference Room, Berkeley"
          status="upcoming"
        />
        <EventCard
          image={event1} 
          title="Cultural Exchange Night" 
          desc="Celebrate the beauty of diversity..."
          date="28"
          month=" Sep"
          year=" 2026"
          time="6:00 PM - 9:00 PM"
          venue="Conference Room, Berkeley"
          status="Completed"
        />
        <EventCard
          image={event1} 
          title="Cultural Exchange Night" 
          desc="Celebrate the beauty of diversity..."
          date="28"
          month=" Sep"
          year=" 2026"
          time="6:00 PM - 9:00 PM"
          venue="Conference Room, Berkeley"
          status="upcoming"
        />
      </div>
      <div className="All-Events-Button">
        <button onClick={() => window.location.href = '/EventsPage'}>SEE ALL EVENTS</button>
      </div>
    </div>
  )
}

export default Events
