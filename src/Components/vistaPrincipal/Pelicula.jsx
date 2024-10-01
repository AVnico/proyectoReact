import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import '../../a.css';

export function Pelicula({ pelicula }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="card text-center mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: 'none' }}>
                <h2>{pelicula.nombre}</h2>
                <img className="card-img-top" src={pelicula.imagen_url} alt={pelicula.nombre} />
                <div className="card-body">
                    <p className="card-text">{pelicula.descripcion}</p>
                </div>
                <button 
                    className="btn-serie btn-success" 
                    onClick={(e) => {
                        e.preventDefault(); // Evita que se recargue la página
                        navigate(`/pelicula/${pelicula.id}`); // Navega a la página de la película
                    }}
                >
                    Ver detalles
                </button>
            </div>
        </Fragment>
    );
}
