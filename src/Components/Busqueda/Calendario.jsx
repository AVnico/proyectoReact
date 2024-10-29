import React, { Fragment, useState, useEffect } from "react";
import Calendar from "react-calendar";
import '../Busqueda/calendar.css';

export function Calendario() {
  const [value, setValue] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const events = [
    { date: new Date(2024, 10, 20), event: "Avengers: Doomsday" },
    { date: new Date(2024, 10, 25), event: "El Hoyo 2" },
    { date: new Date(2024, 11, 5), event: "Joker: Folie à Deux" },
    { date: new Date(2024, 10, 9), event: "Una película de Minecraft" }
  ];

  const getEventForDate = (date) => {
    const foundEvent = events.find(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
    return foundEvent ? foundEvent.event : null;
  };

  const handleDateClick = (date, event) => {
    setValue(date);
    const foundEvent = getEventForDate(date);
    setSelectedEvent(foundEvent);

    const rect = event.target.getBoundingClientRect();
    setPosition({
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    });
  };

  useEffect(() => {
    if (selectedEvent) {
      const timer = setTimeout(() => {
        setSelectedEvent(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedEvent]);

  return (
    <Fragment>
      <div className="calendar-container">
        <h2 className="text-center">Nuevos Estrenos</h2>
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={({ date }) => {
            const event = getEventForDate(date);
            return event ? "highlight" : null;
          }}
          onClickDay={(date, event) => handleDateClick(date, event.nativeEvent)}
        />

        {selectedEvent && (
          <div
            className="event-bubble"
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
          >
            {selectedEvent}
          </div>
        )}
      </div>
    </Fragment>
  );
}
