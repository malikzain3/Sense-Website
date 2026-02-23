import React from 'react'
import "./EventCard.css"
import timeIcon from "../assets/clock.png"
import location from "../assets/pin.png"

const EventCard = ({
    image,
    title,
    desc,
    date,
    month,
    year,
    time,
    venue,
    status
}) => {
    return (
        <div id='Event-Card'>
            <div className="Event-Heading">
                Events
            </div>
            <div className="Event-Image">
                <img src={image} alt={title} />
            </div>
            <div className="Event-Content">

                <div className="Event-Title">
                    {title}
                </div>
                <div className="Event-Desc">
                    {desc}
                </div>
                <div className="Event-Info">
                    <div className="Event-Date">
                        <div className='Event-Date'>{date}</div>
                    </div>
                    <div className="Event-Month-Year">
                        <div className='Event-Month'>{month}</div>
                        <div className='Event-Year'>{year}</div>
                    </div>
                    <div className="Event-Time-Venue">
                        <div>
                            <img src={timeIcon}/>
                            {time}
                        </div>
                        <div>
                            <img src={location} />
                            {venue} 
                        </div>
                    </div>
                </div>
                <div className="Event-Status">

                    <div className={`Status ${status}`}>
                        Status: {status === "upcoming" ? "Upcoming" : "Done"}
                    </div>

                    {status === "upcoming" && (
                        <button className="RSVP-Btn">RSVP</button>
                    )}

                </div>
            </div>
        </div>
    )
}

export default EventCard
