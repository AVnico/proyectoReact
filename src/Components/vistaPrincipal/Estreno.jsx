import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Estreno({ estreno }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            
            <div className="card text-center mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: 'none' }}>
                <h2>{estreno.nombre}</h2>
                <img className="card-img-top" src={estreno.imagen_url} alt={estreno.nombre} />
                <div className="card-body">
                    <p className="card-text">{estreno.descripcion}</p>
                </div>
                <button 
                    className="btn-serie btn-success" 
                    onClick={() => navigate(`/estreno/${estreno.id}`)}
                >
                    Ver detalles
                </button>
            </div>
        </Fragment>
    );
}
