import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Serie({ serie }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="card text-center mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: 'none' }}>
                <h2>{serie.nombre}</h2>
                <img className="card-img-top" src={serie.imagen_url} alt={serie.nombre} />
                <div className="card-body">
                    <p className="card-text">{serie.descripcion}</p>
                </div>
                <button
                    className="btn btn-success"
                    onClick={() => navigate(`/serie/${serie.id}`)}> Ver
                </button>
            </div>
        </Fragment>
    );
}
