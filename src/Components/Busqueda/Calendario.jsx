import React, { Fragment, useState } from "react";
import Calendar from "react-calendar";
import '../../a.css';

export function Calendario() {
    const [value, setValue] = useState(new Date());
    const [hoveredDate, setHoveredDate] = useState(null);
    
    
    const events = [
      { date: new Date(2024, 8, 20), event: "Pelicula Sonic" }, 
      { date: new Date(2024, 8, 25), event: "Pelicula DeadPool" },  
      { date: new Date(2024, 9, 5), event: "Pelicula Mufasa" }  
    ];
  
    // Buscar si la fecha tiene un evento
    const getEventForDate = (date) => {
      const foundEvent = events.find(
        (event) =>
          event.date.getFullYear() === date.getFullYear() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getDate() === date.getDate()
      );
      return foundEvent ? foundEvent.event : null;
    };

    return (
        <Fragment>
            <div className="calendar-container ">
                <Calendar
                    onChange={setValue}
                    value={value}
                    tileClassName={({ date }) => {
                
                        const event = getEventForDate(date);
                        return event ? "highlight" : null;
                    }}
                    onMouseOver={({ activeStartDate, date }) => setHoveredDate(date)}
                />

                {/* Mostrar el evento cuando el usuario pasa el mouse sobre una fecha */}
                {hoveredDate && (
                    <div className="event-tooltip">
                        {getEventForDate(hoveredDate) || "No hay eventos"}
                    </div>
                )}
            </div>
        </Fragment>
    );
}
