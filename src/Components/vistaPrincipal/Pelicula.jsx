import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../a.css';

export function Pelicula({ pelicula }) {
    const navigate = useNavigate();

    // Obtener usuario_id desde localStorage
    const usuario_id = localStorage.getItem('usuario_id');

    const handleAddToFavorites = async () => {
        if (!usuario_id) {
            alert('Debes iniciar sesión para agregar a favoritos.');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/api/autenticacion/favoritos/${usuario_id}`, {
                pelicula_id: pelicula.id, // Solo pasamos pelicula_id en el cuerpo
            });
            alert('Película añadida a favoritos');
        } catch (error) {
            console.error('Error al añadir a favoritos:', error);
            alert('Error al añadir a favoritos');
        }
    };

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
                        e.preventDefault();
                        navigate(`/pelicula/${pelicula.id}`);
                    }}>
                    Ver detalles
                </button>
                <button
                    className="btn-serie btn-warning ml-2"
                    onClick={handleAddToFavorites}>
                    Añadir a Favoritos
                </button>
            </div>
        </Fragment>
    );
}
