import React, { useState, useEffect } from 'react'
import "./EventCard.css"
import timeIcon from "../assets/clock.png"
import location from "../assets/pin.png"

function useCountdown(date, month, year, time) {
    const [timeLeft, setTimeLeft] = useState(null)

    useEffect(() => {
        const monthMap = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        }

        let hours = 0, minutes = 0
        if (time) {
            const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
            if (match) {
                hours = parseInt(match[1])
                minutes = parseInt(match[2])
                if (match[3].toUpperCase() === 'PM' && hours !== 12) hours += 12
                if (match[3].toUpperCase() === 'AM' && hours === 12) hours = 0
            }
        }

        const eventDate = new Date(
            parseInt(year),
            monthMap[month] ?? 0,
            parseInt(date),
            hours,
            minutes
        )

        const tick = () => {
            const now = new Date()
            const diff = eventDate - now
            if (diff <= 0) {
                setTimeLeft(null)
                return
            }
            const d = Math.floor(diff / (1000 * 60 * 60 * 24))
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
            const m = Math.floor((diff / (1000 * 60)) % 60)
            const s = Math.floor((diff / 1000) % 60)
            setTimeLeft({ d, h, m, s })
        }

        tick()
        const interval = setInterval(tick, 1000)
        return () => clearInterval(interval)
    }, [date, month, year, time])

    return timeLeft
}

const EventCard = ({
    image, title, desc, date, month, year, time, venue, status, category, id, 
    register_link, // DB column name se match kar diya
    drive_link    // DB column name se match kar diya
}) => {
    const timeLeft = useCountdown(date, month, year, time)

    return (
        <>
            <div id='Event-Card'>
                <div className="Event-Image">
                    <img src={image} alt={title} />
                    {category && <span className="Event-Category-Badge">{category}</span>}
                </div>

                <div className="Event-Content">
                    <div className="Event-Title">{title}</div>
                    <div className="Event-Desc">{desc}</div>

                    <div className="Event-Info">
                        <div className="Event-Date">{date}</div>
                        <div className="Event-Month-Year">
                            <div className='Event-Month'>{month}</div>
                            <div className='Event-Year'>{year}</div>
                        </div>
                        <div className="Event-Time-Venue">
                            <div><img src={timeIcon} alt="time" />{time}</div>
                            <div><img src={location} alt="location" />{venue}</div>
                        </div>
                    </div>

                    {status === "upcoming" && timeLeft && (
                        <div className="Event-Countdown">
                            <span className="countdown-label">Starts in</span>
                            <div className="countdown-blocks">
                                <div className="countdown-unit"><span>{timeLeft.d}</span><small>Days</small></div>
                                <div className="countdown-sep">:</div>
                                <div className="countdown-unit"><span>{String(timeLeft.h).padStart(2, '0')}</span><small>Hrs</small></div>
                                <div className="countdown-sep">:</div>
                                <div className="countdown-unit"><span>{String(timeLeft.m).padStart(2, '0')}</span><small>Min</small></div>
                                <div className="countdown-sep">:</div>
                                <div className="countdown-unit"><span>{String(timeLeft.s).padStart(2, '0')}</span><small>Sec</small></div>
                            </div>
                        </div>
                    )}

                    <div className="Event-Status">
                        <div className={`Status ${status}`}>
                            Status: {status === "upcoming" ? "UPCOMING" : "DONE"}
                        </div>
                        
                        {/* Yahan register_link use ho raha hai */}
                        {status === "upcoming" ? (
                            <a 
                                href={register_link && register_link !== "" ? register_link : "#"} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="RSVP-Btn" 
                                style={{textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            >
                                Register
                            </a>
                        ) : (
                            <a 
                                href={drive_link && drive_link !== "" ? drive_link : "#"} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="RSVP-Btn" 
                                style={{textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#10b981'}}
                            >
                                Event Photos
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard