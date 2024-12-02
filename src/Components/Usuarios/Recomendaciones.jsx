import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Pelicula } from "../vistaPrincipal/Pelicula"; // Asegúrate de tener este componente para mostrar películas

export function Recomendaciones() {
    const [peliculas, setPeliculas] = useState([]); // Guardar las películas recomendadas
    const [error, setError] = useState(null); // Guardar cualquier error
    const navigate = useNavigate();

    // Obtener el usuario_id y token desde localStorage
    const usuario_id = localStorage.getItem('usuario_id');
    const token = localStorage.getItem('token');

    // Obtener las películas recomendadas basadas en los géneros favoritos del usuario
    useEffect(() => {
        const obtenerRecomendaciones = async () => {
            try {
                if (!token || !usuario_id) {
                    navigate("/login"); // Redirigir a login si no hay token o usuario
                    return;
                }

                // Llamar al backend para obtener las recomendaciones basadas en los géneros favoritos
                const res = await fetch(`http://localhost:5000/api/peliculas/recomendaciones/${usuario_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) {
                    throw new Error('Error al obtener recomendaciones');
                }

                const data = await res.json(); // Obtener las películas
                setPeliculas(data); // Guardar las películas en el estado
            } catch (err) {
                console.error('Error:', err);
                setError('Error al obtener las recomendaciones');
            }
        };

        obtenerRecomendaciones();
    }, [navigate, token, usuario_id]);

    return (
        <Fragment>
            <div className="recomendaciones-container">
                <h1 className="text-center">Películas Recomendadas</h1>
                
                {error && <p>{error}</p>} {/* Mostrar el error si existe */}
                
                <div className="peliculas-container">
                    {peliculas.length > 0 ? (
                        peliculas.map((pelicula) => (
                            <div className="pelicula-card" key={pelicula.id}>
                                <Pelicula pelicula={pelicula} /> {/* Mostrar la película */}
                            </div>
                        ))
                    ) : (
                        <p>No hay recomendaciones por el momento.</p>
                    )}
                </div>
            </div>
        </Fragment>
    );
}
