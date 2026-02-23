import React from "react";
import Navbar from "../Components/Navbar.jsx";
import event1 from "../assets/event1.jpg";
import "../Components/Events.css";
import EventCard from "../Components/EventCard.jsx";
import "./EventsPage.css";
import NeuralBackground from "../Components/NeuralBackground";

const EventsPage = () => {
  return (
    <div id="Event-Page">
      <NeuralBackground />
      <div className="Neural-content">
        <h1 className="Neural-title">
          Events 
        </h1>
      </div>
      <div id="Events1">
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
        <br />
        <br />
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
      </div>
    </div>
  );
};

export default EventsPage;
