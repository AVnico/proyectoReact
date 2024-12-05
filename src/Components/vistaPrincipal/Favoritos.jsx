import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Favoritos({ usuario_id }) {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/autenticacion/favoritos/${usuario_id}`);
                setFavoritos(response.data);
            } catch (error) {
                console.error('Error al obtener los favoritos:', error);
            }
        };

        fetchFavoritos();
    }, [usuario_id]);

    return (
        <div>
            <h2>Mis Favoritos</h2>
            <div className="peliculas-container">
                {favoritos.map((pelicula) => (
                    <div key={pelicula.id}>
                        <h3>{pelicula.nombre}</h3>
                        <p>{pelicula.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
