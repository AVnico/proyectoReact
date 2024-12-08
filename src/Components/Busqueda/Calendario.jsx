import React, { Fragment, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../Busqueda/calendar.css";

export function Calendario() {
  const [value, setValue] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [generoFavorito, setGeneroFavorito] = useState(null);

  // Eventos con género asociado
  const events = [
    { date: new Date(2024, 10, 20), event: "Avengers: Doomsday", genero_id: 1 },
    { date: new Date(2024, 10, 25), event: "El Hoyo 2", genero_id: 2 },
    { date: new Date(2024, 12, 25), event: "Joker: Folie à Deux", genero_id: 3 },
    { date: new Date(2024, 10, 9), event: "Una película de Minecraft", genero_id: 4 },
  ];

  // Función para obtener el género favorito del usuario
  useEffect(() => {
    const fetchGeneroFavorito = async () => {
      try {
        const usuario_id = localStorage.getItem("usuario_id"); // Obtener usuario_id
        if (!usuario_id) return;

        const response = await fetch(`http://localhost:5000/api/autenticacion/usuarios/${usuario_id}/genero-favorito`);
        const data = await response.json();
        setGeneroFavorito(data.genero_id); // Almacenar el género favorito
      } catch (error) {
        console.error("Error al obtener el género favorito del usuario:", error);
      }
    };

    fetchGeneroFavorito();
  }, []);

  // Filtrar eventos según el género favorito del usuario
  const filteredEvents = events.filter((event) => {
    if (generoFavorito === null) return true; // Mostrar todos los eventos si no hay género favorito
    return event.genero_id === generoFavorito;
  });

  const getEventForDate = (date) => {
    const foundEvent = filteredEvents.find(
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

    // Calcular posición de la burbuja basada en el elemento clicado
    const rect = event.target.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    setPosition({
        x: rect.left + scrollX + rect.width / 2,
        y: rect.top + scrollY - 20, // Ajustar para que la burbuja quede encima
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
