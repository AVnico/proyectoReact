import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Pelicula({ pelicula }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="card text-center mb-5 mt-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: 'none' }}>
                <h2>{pelicula.nombre}</h2>
                <img className="card-img-top" src={pelicula.imagen_url} alt={pelicula.nombre} />
                <div className="card-body ">
                    <p className="card-text">{pelicula.descripcion}</p>
                </div>
                <button 
                    className="btn btn-success" 
                    onClick={() => navigate(`/pelicula/${pelicula.id}`)}
                >
                    Ver
                </button>
            </div>
        </Fragment>
    );
}
